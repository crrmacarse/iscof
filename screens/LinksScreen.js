import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { 
  View,
  Button,
  TextInput,
  Text
 } from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Navigate',
  };

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
