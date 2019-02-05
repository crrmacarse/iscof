import React from 'react';

import { withFirebase } from '../firebase';

import { Marker } from 'react-native-maps';

import {
  View,
  Alert,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Platform
} from 'react-native';

import {
  MapView, Icon,
} from 'expo';

class LocationScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  /*

  pass to setImageModalVisible the image then display in modal the image via state

  */

  state = {
    location: null,
    name: null,
    description: null,
    number: null,
    loading: true,
    layer: 'satellite',
    tags: [],
    moreInfo: [],
    modalVisible: false,
    modaIlmage: null,
    modalImageVisible: false,
  };

  _renderMarkerLocation = async () => {
    this.setState({ loading: true });

    let marker = this.props.navigation.getParam('marker');

    if (!marker) {
      Alert.alert(
        'Missing Location',
        'Kindly reach out for the developer to fix this issue',
        [
          { text: 'Close' },
        ],
        { cancelable: false }
      )
      return;
    }

    this.setState({
      location: marker.coords,
      name: marker.name,
      description: marker.description,
      number: marker.number,
      tags: marker.tags,
      moreInfo: marker.moreInfo,
      loading: false,
    })
  }


  setImageModalVisible(visible) {
    this.setState({ modalImageVisible: visible });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    this._renderMarkerLocation();
  }

  render() {
    const { location, layer, name, description, number, moreInfo, tags, loading, } = this.state;

    if (!location) {
      return (
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{ textAlign: 'center' }}>There seems to be an error</Text>
          <Text style={{ marginTop: 5 }}>Kindly contact the developers to fix this issue.</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{
            flex: 1,
            zIndex: -1
          }}
          mapType={layer}
          minZoomLevel={18}
          showsCompass
          loadingEnabled
          showsMyLocationButton
          moveOnMarkerPress={false}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922 / 2.5,
            longitudeDelta: 0.0421 / 2.5,
          }}
        >

          <Marker
            pinColor="orange"
            coordinate={location}
            title={name + ' is here!'}
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
          />

        </MapView>


        <Modal
          animationType="slide"
          transparent
          onRequestClose={() => {
            this.setModalVisible(false)
          }}
          visible={this.state.modalVisible}
        >
          <TouchableWithoutFeedback onPress={() => this.setModalVisible(false)}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
              <View style={{ paddingTop: 25, paddingBottom: 25, width: '100%', backgroundColor: '#fff', justifyContent: "center", alignItems: 'center' }}>
                <View style={{ alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{
                    fontSize: 15,
                    color: '#b3b3b3',
                    marginRight: 6,
                  }}>
                    {number}.
                </Text>

                  <Text style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                    {name}</Text>
                </View>

                <View style={{ alignItems: 'center', flexDirection: 'row', marginBottom: 5 }}>
                  <TouchableWithoutFeedback onPress={() => this.setImageModalVisible(true)}>
                    <Image
                      style={{ width: 75, height: 75 }}
                      source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Lenox_High_School%2C_Lenox_MA.jpg/1200px-Lenox_High_School%2C_Lenox_MA.jpg' }}
                    />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.setImageModalVisible(true)}>
                    <Image
                      style={{ width: 75, height: 75, margin: 3 }}
                      source={{ uri: 'data:image/jpeg;base64,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' }}
                    />
                  </TouchableWithoutFeedback>
                </View>

                <View style={{
                  alignItems: 'center',
                  padding: 3,
                }}>
                  <Text style={{
                    textAlign: 'center',
                    fontStyle: 'italic'
                  }}>{description}</Text>
                </View>

                {moreInfo &&
                  <View style={{
                    alignItems: 'center',
                    padding: 3,
                  }}>
                    <Text style={{
                      textAlign: 'center',
                      fontSize: 12,
                      letterSpacing: 0.5,
                      color: "#585858"
                    }}>Dean: {moreInfo.dean}</Text>
                  </View>
                }

                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                  {tags.map((tag, index) =>
                    <Text key={index}
                      style={{
                        backgroundColor: "#d3d3d3",
                        padding: 2,
                        paddingLeft: 5,
                        paddingRight: 5,
                        borderRadius: 500,
                        marginLeft: 3
                      }}
                    >#{tag}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  style={{
                    marginTop: 15
                  }}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Information</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          presentationStyle="fullScreen"
          onRequestClose={() => {
            this.setImageModalVisible(false)
          }}
          visible={this.state.modalImageVisible}
        >
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#fff', justifyContent: "center", alignItems: 'center' }}>

              <View style={{ flex: 2, alignItems: 'center', flexDirection: 'row' }}>
                <ImageBackground
                  style={{ width: '100%', height: '100%' }}
                  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Lenox_High_School%2C_Lenox_MA.jpg/1200px-Lenox_High_School%2C_Lenox_MA.jpg' }}
                />
              </View>

              <View style={{
                flex: 0,
                position: 'absolute',
                top: 5,
                right: 5,
                zIndex: 1030,
              }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setImageModalVisible(!this.state.modalImageVisible);
                  }}>
                  <Icon.Ionicons
                    name={Platform.OS === 'ios' ? 'ios-close-circle' : 'md-close-circle'}
                    size={40}
                    style={{ marginRight: 8 }}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={{
          position: 'absolute',
          backgroundColor: '#f3f3f3',
          bottom: 10,
          right: 10,
          zIndex: 10,
        }}>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text
              style={{
                color: '#333',
                padding: 8
              }}>More Information
            </Text>
          </TouchableOpacity>
        </View>
      </View >
    );
  }
}

const withFirebaseLocation = withFirebase(LocationScreen);

withFirebaseLocation.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('markername', 'Location Finder'),
  headerStyle: {
    backgroundColor: '#089EE8',
    borderBottomColor: 'black',
    borderBottomWidth: 0,
  }
});

export default withFirebaseLocation;


