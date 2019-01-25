import React from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  Image,
} from 'react-native';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Campus Map',
    headerStyle: {
      backgroundColor: '#ffa000',
      borderBottomColor: 'black',
      borderBottomWidth: 0,
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/campusmap.png')}
          style={styles.campusMap}
          resizeMode = "contain" 
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'rgb(184, 223,203)'
  },
  campusMap: {
    flex: 1,
    width: undefined,
    height: undefined,
    transform: [{rotate: '-16deg'}]
  }
});