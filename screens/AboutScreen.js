import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import {
  Platform,
  View,
  Text,
} from 'react-native';

import {
  Icon,
  Font
} from 'expo';

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    title: 'ISCOF Circle',
  };

  componentDidMount() {
    Font.loadAsync({
      'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'gentium-basic': require('../assets/fonts/GenBasB.ttf'),
    });
  }

  render() {
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
            the passage of R.A. 321, converted the Iloilo National School of Fisheries into the Iloilo Regional..
          </Text>

          <Text style={{ marginTop: 5 }}>Read more</Text>
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
              A <Text style= {{color: 'green', fontWeight:'bold'}}>premier</Text> academic institution in Southeast Asia.
            </Text>

          </View>

        </View>
        {/* 
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
        Proin sed eros in magna cursus
        </Text>

        <Text style={styles.description}>
        Sed non ultricies elit. Integer nec magna ligula. 
        Sed venenatis orci eu eros fringilla, in tincidunt 
        erat scelerisque. Vivamus hendrerit ligula nunc, 
        nec lacinia tellus tincidunt id. In malesuada tellus sit amet elit varius dictum. Nam nec rutrum velit. Pellentesque dignissim dapibus elit, a consectetur 
        ante tristique vel. Donec eu ornare ante.
        </Text>
      </View> */}

        <View style={styles.websiteContainer}>

          <Text style = {{color:'blue'}}> 
            Visit our website 
          </Text>

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
    margin: 25,
    flex: 1,
    color: 'blue',
  },
});