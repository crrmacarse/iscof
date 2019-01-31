import React from 'react';

import { withFirebase } from '../firebase';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';

class MapScreen extends React.Component {

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          onRequestClose = {() => {
            console.log("close");
          }}
          visible={this.state.modalVisible}
        >
          <View style={{ flex: 1, justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
            <View>
              <Text style = {{fontSize: 20, margin: 15, fontWeight:'bold'}}>ISCOF Campus Map Directory</Text>
            </View>

            <View style = {{flexDirection: 'column'}}>
              <Text style = {{margin: 1, }}>1: Administration</Text>
              <Text style = {{margin: 1, }}>2: Enterprise</Text>
              <Text style = {{margin: 1, }}>3: College of Computer Studies</Text>
              <Text style = {{margin: 1, }}>4: College of Lorem Ipsum</Text>
              <Text style = {{margin: 1, }}>5: Dolor Sit</Text>
              <Text style = {{margin: 1, }}>6: Football Field</Text>
            </View>

            <View style = {{marginTop: 25}}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Directory</Text>
              </TouchableOpacity>
            </View>

          </View>
        </Modal>

        <Image
          source={require('../assets/images/campusmap.png')}
          style={styles.campusMap}
          resizeMode="contain"
        />

        <View
          style={{
            position: 'absolute',
            backgroundColor: 'gold',
            padding: 6,
            top: 10,
            right: 10,
            zIndex: 10
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text>
              Show Directory
            </Text>
          </TouchableOpacity>
        </View>

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
    transform: [{ rotate: '-16deg' }]
  }
});

const withFirebaseMap = withFirebase(MapScreen);

withFirebaseMap.navigationOptions = ({ navigation }) => ({
  title: 'Campus Map',
  headerStyle: {
    backgroundColor: '#ffa000',
    borderBottomColor: 'black',
    borderBottomWidth: 0,
  }
});

export default withFirebaseMap;