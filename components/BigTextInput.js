import React from 'react';

import {TextInput} from 'react-native';

export default class BigTextInput extends React.Component {
    render() {
      return (
        <TextInput
          {...this.props}
          editable = {true}
          maxLength = {180}
        />
      );
    }
  }

 