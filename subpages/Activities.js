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

export default class Activities extends Component {
  render() {
    return (
      <ABLMCCWrapper>
        <Text style={this.props.style}>Activities</Text>
      </ABLMCCWrapper>
    );
  }
}
