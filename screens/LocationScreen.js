import React from 'react';

import { withFirebase } from '../firebase';

import { Marker } from 'react-native-maps';

import {
  View,
  Alert,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import {
  MapView,
} from 'expo';

class LocationScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    location: null,
    name: null,
    description: null,
    number: null,
    loading: true,
    layer: 'satellite',
    tags: [],
    modalVisible: false,
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
      loading: false,
    })
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    this._renderMarkerLocation();
  }

  render() {
    const { location, layer, name, description, number, tags, loading } = this.state;

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
          showsIndoors={false}
          showsTraffic={false}
          showsCompass
          showsUserLocation
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
              <View style={{ height: "35%", width: '100%', backgroundColor: '#fff', justifyContent: "center", alignItems: 'center' }}>
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

                <View style={{
                  alignItems: 'center',
                  padding: 3,
                }}>
                  <Text style={{
                    textAlign: 'center',
                    fontStyle: 'italic'
                  }}>{description}</Text>
                </View>

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
    backgroundColor: '#ffa000',
    borderBottomColor: 'black',
    borderBottomWidth: 0,
  }
});

export default withFirebaseLocation;


