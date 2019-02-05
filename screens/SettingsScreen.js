import React from 'react';
import { ExpoConfigView } from '@expo/samples';

import {withFirebase} from '../firebase';

class SettingsScreen extends React.Component {
  
  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}

const withFirebaseSettings = withFirebase(SettingsScreen);

withFirebaseSettings.navigationOptions = ({ navigation }) => ({
  title: 'Application Settings',
  headerStyle: {
    backgroundColor: '#089EE8', 
    borderBottomColor: 'black',
    borderBottomWidth: 0,
  },
});

export default withFirebaseSettings;