import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { withFirebase } from '../firebase';

import {
  View,
  Button,
  TextInput,
  Text
} from 'react-native';


class NavigateScreen extends React.Component {
  static navigationOptions = {
    title: 'Campus Navigator',
    headerStyle: {
      backgroundColor: '#ffa000',
      borderBottomColor: 'black',
      borderBottomWidth: 0,
    },
  };

  constructor(props) {
    super(props);
  }

  _handlePress = () => {
    console.log("not yet");
  }

  _storeExample = () => {

    this.props.firebase.markers().push({
      'name': 'Administration',
      'latitude': 10.8262703,
      'longitude': 122.7115049,
      'status': 'active',
    });

  }

  render() {
    console.log(this);
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
            onPress={this._handlePress}
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
    padding: 8,
  },
  inputBox: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1
  }
});


const withFirebaseNavigate = withFirebase(NavigateScreen);

withFirebaseNavigate.navigationOptions = ({ navigation }) => ({
  title: 'Campus Navigator',
  headerStyle: {
    backgroundColor: '#ffa000',
    borderBottomColor: 'black',
    borderBottomWidth: 0,
  },
});

export default withFirebaseNavigate;
