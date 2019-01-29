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
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Campus Map Directory</Text>

              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
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