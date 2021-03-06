import React from 'react';
import { withFirebase } from '../../firebase';

import Loading from '../../components/Loading';
import BigTextInput from '../../components/BigTextInput';

import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Platform,
} from 'react-native';

import {
  Icon,
  Permissions,
  ImagePicker,
} from 'expo';

const INITIAL_NEW_STATE = {
  newNumber: '',
  newName: '',
  newDescription: '',
  newDean: '',
  newTags: '',
}

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      selectedMarker: [],
      ...INITIAL_NEW_STATE,
      searchVal: '',
      imageArray: [],
      modalEditClose: false,
      modalAddVisible: false,
      withAccess: false,
      accessVal: null,
      loading: false,
    }

  }

  _loadMarkers = async () => {
    this.setState({ loading: true });

    const markerList = [];

    await this.props.firebase.markers().orderBy("name").get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          markerList.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        this.setState({
          markers: markerList,
          loading: false
        });

      }).catch(error => {
        Alert.alert(
          'Internal Error',
          error.message,
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        )
      });
  }

  _setModalAddClose = () => {
    this.setState({
      modalAddVisible: false,
      ...INITIAL_NEW_STATE,
      imageArray: [],
    })
  }

  _setModalEditClose = () => {
    this.setState({
      modalEditClose: false,
      selectedMarker: [],
      imageArray: [],
    })
  }

  _addMarker = () => {
    const {
      newNumber,
      newName,
      newDescription,
      newDean,
      newTags,
      imageArray
    } = this.state;

    this.props.firebase.markers().add({
      'number': newNumber,
      'name': newName,
      'description': newDescription,
      'moreInfo': {
        'dean': newDean,
      },
      'coords': {
        'latitude': 10.8262703,
        'longitude': 122.7115049,
      },
      'tags': newTags.split(","),
      'status': 'active'
    })
      .then((docRef) => {

        this._uploadImage(docRef.id, imageArray).then((response) => {
          this.props.firebase.marker(docRef.id).update({
            imageUrl: response
          }).then(() => {
            Alert.alert(
              'Succesfully Added ',
              'Added location succesfully',
              [
                {
                  text: 'OK', onPress: () => {
                    this._setModalAddClose();
                    this._loadMarkers();
                  }
                },
              ],
              { cancelable: false }
            )
          })
        }).catch((error) => {
          Alert.alert(
            'Internal Error',
            error.message,
            [
              { text: 'OK' },
            ],
            { cancelable: false }
          )
        })
      })
      .catch((error) => {
        Alert.alert(
          'There seems to be an error in Adding',
          error.message,
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        )
      });
  }

  _deleteMarker = (id) => {
    this.props.firebase.marker(id).delete().then(() => {
      Alert.alert(
        'Success',
        'Succesfully deleted the location',
        [
          {
            text: 'OK', onPress: () => {
              this._setModalEditClose();
              this._loadMarkers();
            }
          },
        ],
        { cancelable: false },
      );
    }).catch((error) => {
      Alert.alert(
        'There seems to be an error in Deleting',
        error.message,
        [
          { text: 'OK' },
        ],
        { cancelable: false }
      )
    });
  }

  _saveMarker = () => {
    const { selectedMarker, imageArray } = this.state;
    const markerId = selectedMarker[0].id;

    if (!markerId) { return };

    const tagsArray = Array.isArray(selectedMarker[0].data.tags)
      ? selectedMarker[0].data.tags
      : selectedMarker[0].data.tags.split(",");

    this._uploadImage(markerId, imageArray).then((response) => {
      this.props.firebase.marker(markerId).update({
        number: selectedMarker[0].data.number,
        name: selectedMarker[0].data.name,
        description: selectedMarker[0].data.description,
        moreInfo: {
          dean: selectedMarker[0].data.moreInfo.dean,
        },
        tags: tagsArray,
        imageUrl: response,
        status: selectedMarker[0].data.status
      }).then(() => {
        Alert.alert(
          'Success',
          'Succesfully updated the location info',
          [
            {
              text: 'OK', onPress: () => {
                this._setModalEditClose();
                this._loadMarkers();
              }
            },
          ],
          { cancelable: false }
        )
      })
    }).catch((error) => {
      Alert.alert(
        'Internal Error',
        error.message,
        [
          { text: 'OK' },
        ],
        { cancelable: false }
      )
    })
  }

  _handleSearch = async () => {
    const { searchVal } = this.state;

    if (!searchVal) {
      this._loadMarkers();
      return
    }

    this.setState({ loading: true });

    const markerList = [];

    await this.props.firebase.markers().where("tags", "array-contains", searchVal.toLowerCase()).get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          markerList.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        this.setState({
          markers: markerList,
          loading: false
        });

      }).catch(error => {
        Alert.alert(
          'Internal Error',
          error.message,
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        )
      });
  }

  _handleAccess = () => {
    const { accessVal } = this.state;

    accessVal === "1957"
      ? this.setState({ withAccess: true })
      : Alert.alert(
        'Warning',
        'Incorrect Password',
        [
          { text: 'OK' },
        ],
        { cancelable: false }
      )
  }

  _handleChooseAnImage = async () => {

    let camPerm = await Permissions.askAsync(Permissions.CAMERA);

    if (camPerm.status !== 'granted') {
      Alert.alert("Camera Permission Not Granted");
      return;
    }

    let camRollPerm = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (camRollPerm.status !== 'granted') {
      Alert.alert("Camera Roll Permission Not Granted");
      return;
    }

    let result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      this.setState((previousState) => ({
        imageArray: [...previousState.imageArray, result.uri]
      }));
    }
  }

  _submitImageUpload = async (id, uri) => {
    let filename = uri.split('/').pop();

    /* 
      a fetch issue

      https://github.com/expo/expo/issues/2402 
x
    */

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed')); // error occurred, rejecting
      };
      xhr.responseType = 'blob'; // use BlobModule's UriHandler
      xhr.open('GET', uri, true); // fetch the blob from uri in async mode
      xhr.send(null); // no initial data
    });

    const ref = this.props.firebase
      .imgStorage()
      .child(`/images/${id}/${filename}`);
    const snapshot = await ref.put(blob);
    const remoteUri = await snapshot.ref.getDownloadURL();

    blob.close();

    return remoteUri;
  }

  _uploadImage = async (id, uriArray) => {

    const remoteUri = await Promise.all(uriArray.map(async (uri) => {
      return await this._submitImageUpload(id, uri);
      // return remoteUri
    }));

    return remoteUri;
  }

  componentDidMount() {
    this._loadMarkers();
  }

  render() {
    const {
      markers,
      newNumber,
      newName,
      newDescription,
      newDean,
      newTags,
      selectedMarker,
      modalEditClose,
      modalAddVisible,
      imageArray,
      loading,
      searchVal,
      accessVal,
      withAccess
    } = this.state;

    const isInvalid =
      newNumber === '' ||
      newName === '' ||
      newDescription === '' ||
      newDean === '' ||
      newTags === '';

    const { navigate } = this.props.navigation;

    const renderAccessControl = (

      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <View style={{ alignSelf: 'center', width: "60%" }}>
          <Text style={{
            color: "grey"
          }}
            onPress={() => {
              this._storeExample();
            }}
          >
            ISCOF - Dumangas Password
          </Text>
          <TextInput
            onChangeText={(text) => this.setState({ accessVal: text })}
            placeholder="Password"
            style={styles.inputBox}
            onSubmitEditing={this._handleAccess}
            name="accessVal"
            value={accessVal}
          />
          <Button
            onPress={this._handleAccess}
            title="Submit"
            color="orange"
            accessibilityLabel="Submit"
          />

        </View>
      </View>
    )

    const renderLoading = (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <View style={{ alignSelf: 'stretch', flex: 3, flexGrow: 1 }}>
          <Loading />
        </View>
      </View>
    )

    /* 
       Validate Component states
    */

    if (!withAccess) {
      return (
        renderAccessControl
      );
    }

    if (loading) {
      return (
        renderLoading
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
            <View style={{ flexGrow: 1, marginRight: 5 }}>
              <TextInput
                onChangeText={(text) => this.setState({ searchVal: text })}
                placeholder="Search"
                style={styles.inputBox}
                onSubmitEditing={this._handleSearch}
                name="searchVal"
                value={searchVal}
              />
            </View>
            <View style={{ flexShrink: 1, marginRight: 2 }}>
              <Button
                onPress={this._handleSearch}
                title="Search"
                color="#0f5e00"
                accessibilityLabel="Search"
              />
            </View>
            <View style={{ flexShrink: 1 }}>
              <Button
                onPress={() => {
                  this.setState({
                    modalAddVisible: true
                  })
                }}
                title="New"
                color="#ffa000"
                accessibilityLabel="New"
              />
            </View>
          </View>

        </View>

        <ScrollView style={styles.containerMarkerMain}>
          {markers.map((marker) =>
            <TouchableOpacity onPress={() => {
              this.setState({
                modalEditClose: true,
                selectedMarker: [marker],
              })
            }} key={marker.id}>
              <View style={styles.containerMarker}>
                <Text style={styles.markerTitle}>{marker.data.name}</Text>
                <View style={{ flexDirection: 'column', alignContent: 'flex-end', justifyContent: 'flex-end' }}>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                  <Icon.Ionicons
                    name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'}
                    size={20}
                    style={{ marginRight: 4 }}
                    color="#333"
                  />
                </View>
              </View>

            </TouchableOpacity>
          )}
        </ScrollView>

        {/* Add Modal */}

        <Modal
          animationType="slide"
          transparent={false}
          presentationStyle="fullScreen"
          onRequestClose={() => {
            this._setModalClose()
          }}
          visible={modalAddVisible}
        >
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

            <View style={{ backgroundColor: '#fff', alignItems: 'stretch' }}>

              <View stlye={{ alignSelf: 'flex-start' }}>
                <Text style={{
                  fontSize: 30,
                  margin: 15,
                  fontWeight: "bold",
                  textAlign: "center"
                }}>
                  New Location
              </Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                <Text
                  style={{
                    color: "#666",
                    fontSize: 20,
                    marginRight: 5,
                  }}>
                  Number:
                 </Text>
                <TextInput
                  onChangeText={(text) => this.setState({ newNumber: text })}
                  style={{
                    padding: 10,
                    borderColor: 'gray',
                    borderWidth: 1,
                    height: 35,
                    marginTop: 5,
                    marginBottom: 5,
                    width: 200,
                  }}
                  textContentType='telephoneNumber'
                  keyboardType='numeric'
                  name="currMarkerNumber"
                  value={newNumber}
                />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                <Text
                  style={{
                    color: "#666",
                    fontSize: 20,
                    marginRight: 5,
                  }}>
                  Name:
                 </Text>
                <TextInput
                  onChangeText={(text) => this.setState({ newName: text })}
                  style={{
                    padding: 10,
                    borderColor: 'gray',
                    borderWidth: 1,
                    height: 35,
                    marginTop: 5,
                    marginBottom: 5,
                    width: 200,
                  }}
                  name="currMarkerName"
                  value={newName}
                />
              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                <Text
                  style={{
                    color: "#666",
                    fontSize: 20,
                    marginRight: 5,
                  }}>
                  Description:
                 </Text>
                <View style={{
                  borderColor: 'grey',
                  borderWidth: 1,
                  width: "50%",
                  flexGrow: 1
                }}
                >
                  <BigTextInput
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => this.setState({ newDescription: text })}
                    value={newDescription}
                  />
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                <Text
                  style={{
                    color: "#666",
                    fontSize: 20,
                    marginRight: 5,
                  }}>
                  Dean:
                 </Text>
                <TextInput
                  onChangeText={(text) => this.setState({ newDean: text })}
                  style={{
                    padding: 10,
                    borderColor: 'gray',
                    borderWidth: 1,
                    height: 35,
                    marginTop: 5,
                    marginBottom: 5,
                    width: 200,
                  }}
                  name="currMarkerName"
                  value={newDean}
                />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                <Text
                  style={{
                    color: "#666",
                    fontSize: 20,
                    marginRight: 5,
                  }}>
                  Image:
                 </Text>
                <TouchableOpacity
                  onPress={this._handleChooseAnImage}
                >
                  <Text>
                    Choose an Image ({imageArray.length})
                   </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                <Text
                  style={{
                    color: "#666",
                    fontSize: 20,
                    marginRight: 5,
                  }}>
                  Tags:
                 </Text>
                <TextInput
                  onChangeText={(text) => {
                    this.setState({ newTags: text })
                  }}
                  style={{
                    padding: 10,
                    borderColor: 'gray',
                    borderWidth: 1,
                    height: 35,
                    marginTop: 5,
                    marginBottom: 5,
                    width: 200,
                  }}
                  placeholder="sampletag1,sampletag2"
                  name="currMarkerTags"
                  value={newTags.toString()}
                />
              </View>

              <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
                < View style={{
                  margin: 3,
                }}
                >
                  <Button
                    onPress={() => {
                      this._addMarker();
                    }}
                    disabled={isInvalid}
                    title="Add"
                    color="#ffa000"
                    accessibilityLabel="Add"
                  />
                </View>

                < View style={{
                  margin: 3
                }}
                >
                  <Button
                    onPress={() => {
                      this._setModalAddClose();
                    }}
                    title="Close"
                    color="#333"
                    accessibilityLabel="Close"
                  />
                </ View>

              </View>

            </View>
          </View>
        </Modal>

        {/* Edit Modal */}

        <Modal
          animationType="slide"
          transparent={false}
          presentationStyle="fullScreen"
          onRequestClose={() => {
            this._setModalEditClose()
          }}
          visible={modalEditClose}
        >
          {selectedMarker && selectedMarker.map((marker, index) =>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} key={marker.id}>
              <View style={{ backgroundColor: '#fff', alignItems: 'stretch' }}>

                <View stlye={{ alignSelf: 'flex-start' }}>
                  <Text style={{
                    fontSize: 24,
                    margin: 15,
                    fontWeight: "bold",
                    textAlign: "center"
                  }}>
                    Update {marker.data.name}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                  <Text
                    style={{
                      color: "#666",
                      fontSize: 20,
                      marginRight: 5,
                    }}>
                    Number:
                 </Text>
                  <TextInput
                    onChangeText={(text) => {
                      let markerJson = JSON.parse(JSON.stringify(this.state.selectedMarker));

                      markerJson[0].data.number = text;

                      this.setState({
                        selectedMarker: markerJson
                      })
                    }}
                    style={{
                      padding: 10,
                      borderColor: 'gray',
                      borderWidth: 1,
                      height: 35,
                      marginTop: 5,
                      marginBottom: 5,
                      width: 200,
                    }}
                    textContentType='telephoneNumber'
                    keyboardType="number-pad"
                    name="currMarkerNumber"
                    value={marker.data.number.toString()}
                  />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                  <Text
                    style={{
                      color: "#666",
                      fontSize: 20,
                      marginRight: 5,
                    }}>
                    Name:
                 </Text>
                  <TextInput
                    onChangeText={(text) => {
                      let markerJson = JSON.parse(JSON.stringify(this.state.selectedMarker));

                      markerJson[0].data.name = text;

                      this.setState({
                        selectedMarker: markerJson
                      })
                    }}
                    style={{
                      padding: 10,
                      borderColor: 'gray',
                      borderWidth: 1,
                      height: 35,
                      marginTop: 5,
                      marginBottom: 5,
                      width: 200,
                    }}
                    name="currMarkerName"
                    value={marker.data.name}
                  />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                  <Text
                    style={{
                      color: "#666",
                      fontSize: 20,
                      marginRight: 5,
                    }}>
                    Description:
                 </Text>
                  <View style={{
                    borderColor: 'grey',
                    borderWidth: 1,
                    width: "50%",
                    flexGrow: 1
                  }}
                  >
                    <BigTextInput
                      multiline={true}
                      numberOfLines={4}
                      value={marker.data.description}
                      onChangeText={(text) => {
                        let markerJson = JSON.parse(JSON.stringify(this.state.selectedMarker));

                        markerJson[0].data.description = text;

                        this.setState({
                          selectedMarker: markerJson
                        })
                      }}
                      value={marker.data.description}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                  <Text
                    style={{
                      color: "#666",
                      fontSize: 20,
                      marginRight: 5,
                    }}>
                    Dean:
                 </Text>
                  <TextInput
                    onChangeText={(text) => {
                      let markerJson = JSON.parse(JSON.stringify(this.state.selectedMarker));

                      markerJson[0].data.moreInfo.dean = text;

                      this.setState({
                        selectedMarker: markerJson
                      })
                    }}
                    style={{
                      padding: 10,
                      borderColor: 'gray',
                      borderWidth: 1,
                      height: 35,
                      marginTop: 5,
                      marginBottom: 5,
                      width: 200,
                    }}
                    name="currMarkerName"
                    value={marker.data.moreInfo.dean}
                  />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                  <Text
                    style={{
                      color: "#666",
                      fontSize: 20,
                      marginRight: 5,
                    }}>
                    Image:
                 </Text>
                  <TouchableOpacity
                    onPress={this._handleChooseAnImage}
                  >
                    <Text>
                      Choose an Image ({marker.data.imageUrl ? marker.data.imageUrl.length + imageArray.length: imageArray.length})
                   </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                  <Text
                    style={{
                      color: "#666",
                      fontSize: 20,
                      marginRight: 5,
                    }}>
                    Tags:
                 </Text>
                  <TextInput
                    onChangeText={(text) => {
                      let markerJson = JSON.parse(JSON.stringify(this.state.selectedMarker));

                      markerJson[0].data.tags = text;

                      this.setState({
                        selectedMarker: markerJson
                      })
                    }}
                    style={{
                      padding: 10,
                      borderColor: 'gray',
                      borderWidth: 1,
                      height: 35,
                      marginTop: 5,
                      marginBottom: 5,
                      width: 200,
                    }}
                    name="currMarkerTags"
                    placeholder="sampletag1,sampletag2"
                    value={marker.data.tags.toString()}
                  />
                </View>

                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>

                  < View style={{
                    margin: 3,
                  }}
                  >
                    <Button
                      onPress={() => {
                        this._saveMarker();
                      }}
                      title="Save"
                      color="green"
                      accessibilityLabel="Save"
                    />
                  </View>

                  < View style={{
                    margin: 3
                  }}
                  >
                    <Button
                      onPress={() => {
                        this._setModalEditClose();
                        navigate('LocationSettings', {
                          markerTitle: marker.data.name,
                          marker,
                          _loadMarkers: this._loadMarkers.bind(this),
                        });
                      }}
                      title="Edit Location"
                      color="blue"
                      accessibilityLabel="Edit Location"
                    />
                  </ View>

                  < View style={{
                    margin: 3
                  }}
                  >
                    <Button
                      onPress={() => {
                        this._deleteMarker(marker.id);
                      }}
                      title="Delete"
                      color="red"
                      accessibilityLabel="Delete"
                    />
                  </ View>

                  < View style={{
                    margin: 3
                  }}
                  >
                    <Button
                      onPress={() => {
                        this._setModalEditClose();
                      }}
                      title="Close"
                      color="#333"
                      accessibilityLabel="Close"
                    />
                  </ View>
                </View>
              </View>
            </View>
          )
          }
        </Modal>

      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 5,
  },
  inputBox: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    height: 35,
    marginTop: 5,
    marginBottom: 5,
  },
  containerMarkerMain: {
    flexGrow: 2,
  },
  containerMarker: {
    backgroundColor: '#d3d3d3',
    padding: 20,
    margin: 10,
    marginBottom: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  markerTitle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  markerDistanceCount: {
    fontSize: 12
  }
});

const withFirebaseSettings = withFirebase(SettingsScreen);

withFirebaseSettings.navigationOptions = ({ navigation }) => ({
  title: 'Settings',
  headerStyle: {
    backgroundColor: '#089EE8',
    borderBottomColor: 'black',
    borderBottomWidth: 0,
  },
});

export default withFirebaseSettings;
