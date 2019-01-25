import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import {
  View,
  Button,
  TextInput,
  Text
} from 'react-native';

export default class NavigateScreen extends React.Component {
  static navigationOptions = {
    title: 'Campus Navigator',
    headerStyle: {
      backgroundColor: '#ffa000',
      borderBottomColor: 'black',
      borderBottomWidth: 0,
    },
  };

  _handlePress = () => {
    console.log("not yet");
  }

  render() {
    return (
      <ScrollView style={styles.container}>

        <View style={styles.contentContainer}>

          <Text style={styles.title}>
            ISCOF Navigator
          </Text>

          <TextInput
            style={styles.inputBox}
          />
          <Button
            onPress = {this._handlePress}
            title="Search"
            color="#0f5e00"
            accessibilityLabel="Learn more about this purple button"
          />

        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  contentContainer: {
    justifyContent: 'center',
    flex: 1,
    padding: 8,
  },
  inputBox: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1
  }
});
