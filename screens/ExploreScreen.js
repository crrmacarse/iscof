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

import { Marker } from 'react-native-maps';

export default class ExploreScreen extends React.Component {
  static navigationOptions = {
    title: 'Campus Explore',
    headerStyle: {
      backgroundColor: '#ffa000',
      borderBottomColor: 'black',
      borderBottomWidth: 0,
    }
  };

  state = {
    location: null,
    layer: 'satellite',
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

      this.setState({
        location,
      });
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
    const { location, layer } = this.state;

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
            <Text style = {{marginTop: 5}}>Refresh</Text>
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
          minZoomLevel={18}
          maxZoomLevel={18}
          scrollEnabled={false}
          showsIndoors={false}
          showsTraffic={false}
          showsCompass
          showsUserLocation
          loadingEnabled
          showsMyLocationButton
          moveOnMarkerPress={false}
          initialRegion={{
            latitude: 10.8262703,
            longitude: 122.7115049,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >

          <Marker coordinate={location.coords} title="You're here" />

        </MapView>

        <Picker
          selectedValue={layer}
          style={{
            position: 'absolute',
            backgroundColor: '#f3f3f3',
            borderColor: 'green',
            width: 75,
            height: 30,
            bottom: 10,
            right: 10,
            zIndex: 10
          }}
          mode="dropdown"
          onValueChange={(itemValue, itemIndex) => this.setState({ layer: itemValue })}>
          <Picker.Item label="Default" value="standard" />
          <Picker.Item label="Satellite" value="satellite" />
        </Picker>

      </View>
    );
  }
}