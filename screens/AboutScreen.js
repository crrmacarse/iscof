import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import AdditionalHistory from '../components/AdditionalHistory';

import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';

import {
  Icon,
  Font,
  WebBrowser
} from 'expo';

export default class AboutScreen extends React.Component {
  state = {
    readMore: false,
  }

  static navigationOptions = {
    title: 'ISCOF Circle',
    headerStyle: {
      backgroundColor: '#ffa000',
      borderBottomColor: 'black',
      borderBottomWidth: 0,
    }
  };

  componentDidMount() {
    Font.loadAsync({
      'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'gentium-basic': require('../assets/fonts/GenBasB.ttf'),
    });
  }

  _handleVisitWebsitePress = () => {
    WebBrowser.openBrowserAsync('https://www.iscof.edu.ph/');
  }

  _handleReadMoreHistory = () => {
    this.setState(prevState => ({
      readMore: !prevState.readMore
    }))
  }

  render() {
    const { readMore } = this.state;
    const {navigate} = this.props.navigation;

    return (

      <ScrollView style={styles.container}>

        <View style={styles.topContainer}>
          <Icon.Ionicons
            style={styles.mainIcon}
            name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
            size={60}
          />
          <View
            style={styles.mainDivider}
          />
          <Text style={styles.mainTitle}>
            Iloilo State College of Science and Technology - Dumangas Campus
          </Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.description}>
            The Iloilo State College of Fisheries
            is a public college in the Philippines. It is mandated to provide higher technological, professional and vocational instruction and training in fisheries, science, as well as short-term
            technical or vocational courses in fisheries.
          </Text>
        </View>

        <View style={styles.websiteContainer}>
          <TouchableOpacity onPress={this._handleVisitWebsitePress}>
            <Text style={{ color: 'blue' }}>
              Visit our website
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>
            HISTORY
          </Text>
          <Text style={styles.historyDescription}>
            On June 22, 1957, Congressman Ricardo Y. Ladrido authored and sponsored Republic Act 1925,
            converting the Barotac Nuevo High School (BNH’S) into a national school of fisheries known
            as Central Iloilo National School of Fisheries (CINSOF), with Mr. Amedeo S. Timbol as its
            first principal. In 1961, the late Don Juan Paranpan donated a lot in Tiwi, Barotac Nuevo,
            Iloilo, and broadened the school’s scope of curricular offerings to include collegiate courses.
            the passage of R.A. 321, converted the Iloilo National School of Fisheries into the Iloilo Regional
            School of Fisheries..
          </Text>

          <TouchableOpacity
            onPress={this._handleReadMoreHistory}
            style={readMore && { display: 'none' }}
          >
            <Text style={{ marginTop: 5 }}>Read more</Text>
          </TouchableOpacity>

          {readMore && <AdditionalHistory />}

        </View>

        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>
            MISSION AND VISION
          </Text>

          <View style={styles.mvContainer}>
            <Text style={styles.semiMVTitle}>
              MISSION
            </Text>
            <Text style={styles.historyDescription}>
              To provide advanced education, higher technological, professional instruction and training in fisheries
              technology, arts and sciences, education, industrial technology, engineering, aquaculture, seaweed farming
              and other related fields of study and as may be relevant to national development. It shall also undertake
              research, extension services and production activities in support of the development of the Province of
              Iloilo and provide progressive leadership in its areas of specialization.
            </Text>
          </View>

          <View style={styles.mvContainer}>
            <Text style={styles.semiMVTitle}>
              Vision
            </Text>
            <Text style={styles.historyDescription}>
              A <Text style={{ color: 'green', fontWeight: 'bold' }}>premier</Text> academic institution in Southeast Asia.
            </Text>
          </View>

        </View>

        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>
            Campus Map
          </Text>
          <View style = {styles.campusTourButtonContainer}>
          <Button
            onPress={() => navigate('CampusMap')}
            title="View Campus Map"
            color="#0f5e00"
            accessibilityLabel="Go for a Campus Tour!"
          />
          </View>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginBottom: 0,
  },
  mainIcon: {
    marginLeft: 10,
    color: '#0f5e00',
  },
  mainDivider: {
    backgroundColor: '#d3d3d3',
    paddingLeft: 1,
    height: 100,
    margin: 14,
  },
  mainTitle: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    width: 300,

  },
  contentContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 0,
    padding: 10,
  },
  description: {
    marginTop: 5,
    letterSpacing: 1.2,
    fontSize: 15,
    padding: 10,
    color: '#343a40',
  },
  historyContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 5,
    padding: 15,
  },
  historyDescription: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  historyTitle: {
    fontFamily: 'open-sans-bold',
    fontSize: 25,
  },
  mvContainer: {
    margin: 10,
  },
  semiMVTitle: {
    fontWeight: 'bold',
    color: '#be6837',
  },
  websiteContainer: {
    margin: 30,
    marginBottom: 20,
    marginTop: 5,
    flexDirection: 'row-reverse',
    color: 'blue',
  },
  campusTourButtonContainer: {
    marginTop: 20,
    marginBottom: 30,
  }
});