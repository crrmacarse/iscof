import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const harvesine = require('haversine');

import { withFirebase } from '../firebase';

import Loading from '../components/Loading';

import {
  View,
  Button,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  Permissions,
  Location,
  Icon,
} from 'expo';

class NavigateScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      searchVal: '',
      loading: false,
      location: null,
    }
  }

  _loadMarkers = () => {
    this.setState({ loading: true });

    this.props.firebase.markers().on('value', snapshot => {
      const listObject = snapshot.val();

      const markerList = Object.keys(listObject || {}).map(key => ({
        ...listObject[key],
        id: key
      }))

      this.setState({
        markers: markerList,
        loading: false,
      })
    })
  }

  _getLocationAsync = async () => {
    this.setState({ loading: true });

    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        [
          { text: 'Close' },
        ]
      )
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

      if (location) {
        this.setState({
          location,
          loading: false,
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

  _storeExample = () => {
    this.props.firebase.markers().push({
      'number': 1,
      'name': 'Football Field',
      'description': 'Curabitur eleifend tristique lectus vitae finibus. Sed mi lacus, venenatis tempor massa ac, varius convallis massa',
      'coords': {
        'latitude': 10.8262703,
        'longitude': 122.7115049,
      },
      'tags': ["admin", "president", "office"],
      'status': 'active',
    });
  }

  _handleSearch = () => {
    this.setState({ loading: true });
    this._loadMarkers();
    const { markers, searchVal } = this.state;
    console.log('Markers is : ' + JSON.stringify(markers));
    const resultMarker = [];

    // resultMarker = markers.filter(marker => {
    //   return Object.keys(marker).some(key => marker[key].toString()).search(searchVal.toLowerCase() !== -1);
    // })

    markers.filter(marker => {
      console.log(marker.name.toLowerCase() + " == " + searchVal.toLowerCase())
      if (marker.name.toLowerCase() === searchVal.toLowerCase()) {
        resultMarker.push(marker);
        console.log("hello", marker.name);
      }
    })

    if (resultMarker && resultMarker.length) {
      console.log("yes");
      this.setState({
        markers: resultMarker,
        loading: false,
      })
    }
  }

  componentDidMount() {
    this._getLocationAsync();
    this._loadMarkers();
  }

  componentWillUnmount() {
    this.props.firebase.markers().off();
  }

  render() {

    const { markers, loading, searchVal, location } = this.state;
    const { navigate } = this.props.navigation;

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
      <View style={styles.container}>

        <View style={styles.contentContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
            <Icon.Ionicons
              name="ios-search"
              size={26}
              style={{ marginRight: 8}}
              color="rgba(15,94,0, 0.5)"
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                letterSpacing: 0.75,
                color: "#666"
              }}
              onPress={this._storeExample}>
              The ISCOF Navigator
           </Text>
          </View>

          <TextInput
            onChangeText={(text) => this.setState({ searchVal: text })}
            placeholder="Search"
            style={styles.inputBox}
            onSubmitEditing={this._handleSearch}
            name="searchVal"
            value={searchVal}
          />
          <Button
            onPress={this._handleSearch}
            title="Search"
            color="#0f5e00"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        {loading && (
          // style={{alignSelf: 'center', flexDirection: 'column-reverse'}*/}
          <View style={{ alignSelf: 'stretch', flex: 2, flexGrow: 1 }}>
            <Loading />
          </View>
        )}
        <ScrollView style={styles.containerMarkerMain}>

          {markers.map((marker) =>
            <TouchableOpacity onPress={() => navigate('Location', { markername: marker.name, marker })} key={marker.id}>
              <View style={styles.containerMarker}>
                <Text style={styles.markerTitle}>{marker.name}</Text>
                <Text style={styles.markerDistanceCount}>
                  {Math.round(harvesine(location.coords, marker.coords, { unit: 'meter' }) * 100) / 100} m
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 8,
  },
  inputBox: {
    height: 40,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
  containerMarkerMain: {
    flexGrow: 2,
  },
  containerMarker: {
    backgroundColor: '#d3d3d3',
    padding: 20,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  markerTitle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  markerDistanceCount: {
    fontSize: 12
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
