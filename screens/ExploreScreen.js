import React, { Component } from 'react';

import {
  View,
  Alert,
  Picker,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  MapView,
  Location,
  Permissions
} from 'expo';

import { withFirebase } from '../firebase';
import { Marker } from 'react-native-maps';

class ExploreScreen extends React.Component {
  state = {
    location: null,
    where: null,
    layer: 'satellite'
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        [
          { text: 'Close' },
        ],
        { cancelable: false }
      )
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});

      let where = (await Location.reverseGeocodeAsync(location.coords))[0];

      if(location){
        this.setState({
          location,
          where
         });
      }

    } catch (error) {

      Alert.alert(
        error.message,
        'Kindly enable your location services if you want to utilize our GPS tracking system.',
        [
          { text: 'OK' },
        ],
        { cancelable: false }
      )
    }
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  render() {
    const { location, layer, where } = this.state;

    if (!location) {
      return (
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{ textAlign: 'center' }}>Kindly enable your location services first.</Text>
          <TouchableOpacity
            onPress={this._getLocationAsync}>
            <Text style={{ marginTop: 5 }}>Refresh</Text>
          </TouchableOpacity>
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
          // minZoomLevel={18}
          maxZoomLevel={16}
          // scrollEnabled={false}
          showsIndoors={false}
          showsTraffic={false}
          showsCompass
          showsUserLocation
          loadingEnabled
          showsMyLocationButton
          moveOnMarkerPress={false}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922 / 2.5,
            longitudeDelta: 0.0421 / 2.5,
          }}
        >

          <Marker
            coordinate={location.coords}
            title="You're here"
            description={where.name + " " + where.street + ", " + where.city}
          />

        </MapView>

        <Picker
          selectedValue={layer}
          style={{
            position: 'absolute',
            backgroundColor: '#f3f3f3', 
            color: '#333',
            width: 75,
            height: 30,
            bottom: 10,
            right: 10,
            zIndex: 10
          }}
          mode="dropdown"
          onValueChange={(itemValue, itemIndex) => this.setState({ layer: itemValue })}>
          <Picker.Item label="Default" color="black" value="standard" />
          <Picker.Item label="Satellite" color="black" value="satellite" />
        </Picker>

      </View>
    );
  }
}


const withFirebaseExplore = withFirebase(ExploreScreen);

withFirebaseExplore.navigationOptions = ({ navigation }) => ({
  title: 'Campus Navigator',
  headerStyle: {
    backgroundColor: '#ffa000',
    borderBottomColor: 'black',
    borderBottomWidth: 0,
  },
});

export default withFirebaseExplore;