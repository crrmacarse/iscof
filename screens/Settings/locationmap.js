import React from 'react';

import { withFirebase } from '../../firebase';

import { Marker } from 'react-native-maps';

import {
  View,
  Alert,
  Text,
  Button
} from 'react-native';

import { NavigationActions } from 'react-navigation';

import {
  MapView,
} from 'expo';

class LocationSettingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  /*

  pass to setImageModalVisible the image then display in modal the image via state

  */

  state = {
    location: null,
    loading: false,
    markerId: null,
    layer: 'satellite',
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
      location: marker.data.coords,
      markerId: marker.id,
      loading: false,
    })
  }

  _saveLocation = () => {
    const { markerId, location } = this.state;

    this.props.firebase.marker(markerId).update({
      coords: {
        latitude: location.latitude,
        longitude: location.longitude
      }
    }).then(() => {
      Alert.alert(
        'Success',
        'Succesfully updated map location',
        [
          {text: 'OK', onPress: () => {
            this.props.navigation.state.params._loadMarkers();
            this.props.navigation.dispatch(NavigationActions.back())        
          }},
        ],
        {cancelable: false},
      );
    })
    .catch((error) => {
      Alert.alert(
        'There seems to be an error in Deleting',
        error,
        [
          { text: 'OK' },
        ],
        { cancelable: false }
      )
    })
  }

  componentDidMount() {
    this._renderMarkerLocation();
  }

  render() {
    const { location, layer } = this.state;

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
            draggable
            onDragEnd={(event) => {
              this.setState({
                location: event.nativeEvent.coordinate,
              })
            }}
            coordinate={location}
            description='Long press to activate marker dragging.'
            title={'Are you sure this is the location?'}
          />

        </MapView>

        <View style={{
          position: 'absolute',
          backgroundColor: '#f3f3f3',
          bottom: 10,
          right: 10,
          zIndex: 10,
        }}>

          <View style={{ flexDirection: 'row' }}>
            < View style={{
              margin: 3,
            }}
            >
              <Button
                onPress={() => {
                  this._saveLocation();
                }}
                title="Save Location"
                color="green"
                accessibilityLabel="Save"
              />
            </View>
          </View>
        </View>
      </View >
    );
  }
}

const withFirebaseLocationSettings = withFirebase(LocationSettingsScreen);

withFirebaseLocationSettings.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('markerTitle', 'Location Settings'),
  headerStyle: {
    backgroundColor: '#089EE8',
    borderBottomColor: 'black',
    borderBottomWidth: 0,
  }
});

export default withFirebaseLocationSettings;


