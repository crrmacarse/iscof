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

import Loading from '../components/Loading';

class MapScreen extends React.Component {
  state = {
    modalVisible: false,
    markers: [],
    loading: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    this._loadMarkers();
  }

  _loadMarkers = async () => {
    this.setState({ loading: true });

    const markerList = [];

    await this.props.firebase.markers().orderBy("number").get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          markerList.push(doc.data());
        });

        const listMarker = Object.keys(markerList || {}).map(key => ({
          ...markerList[key],
          id: key
        }))

        this.setState({
          markers: listMarker,
          loading: false
        });
      }).catch(error => {
        Alert.alert(
          'Internal Error',
          error.message,
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        )
      });
  }

  render() {
    const { markers, loading } = this.state;

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          onRequestClose={() => {
            console.log("close");
          }}
          visible={this.state.modalVisible}
        >
          <View style={{ flex: 1, justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 20, margin: 15, fontWeight: 'bold' }}>ISCOF Campus Map Directory</Text>
            </View>

            <View style={{ flexDirection: 'column' }}>
              {loading && (
                // style={{alignSelf: 'center', flexDirection: 'column-reverse'}*/}
                <View style={{ alignSelf: 'stretch', flex: 2, flexGrow: 1 }}>
                  <Loading />
                </View>
              )}

              {markers.map((marker) =>
                <Text key={marker.id} style={{ margin: 1, }}>{marker.number}: {marker.name}</Text>
              )}
            </View>

            <View style={{ marginTop: 25 }}>
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
    backgroundColor: '#089EE8',
    borderBottomColor: 'black',
    borderBottomWidth: 0,
  }
});

export default withFirebaseMap;