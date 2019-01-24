import React,  { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Platform } from 'react-native';

import {
  MapView,
} from 'expo';

import { Marker } from 'react-native-maps';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Campus Map',
  };

  render() {
   
    return (
        <MapView
        style={{ flex: 1 }}
        mapType = "satellite"
        minZoomLevel = {18}
        maxZoomLevel = {18}
        scrollEnabled = {false}
        initialRegion={{
          latitude: 10.8262703,
          longitude: 122.7115049,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      <Marker
            coordinate = {{
                latitude: 10.8259498,
                longitude: 122.7118036,
            }}
            title = "You're here"
        />
    </MapView>
    );
  }
}