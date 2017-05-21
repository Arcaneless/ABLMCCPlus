import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Navigator,
  TouchableOpacity
} from 'react-native';
import ABLMCCWrapper from '../ABLMCCWrapper';
var DomParser = require('react-native-html-parser').DOMParser;
import styles from '../styles.js';

export default class Loading extends Component {
  render() {
    return (
      <ABLMCCWrapper>
        <Text style={this.props.style}>Loading</Text>
      </ABLMCCWrapper>
    );
  }
}
