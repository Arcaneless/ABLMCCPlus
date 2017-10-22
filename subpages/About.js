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

//todo
export default class About extends Component {
  static navigationOptions = {
    tabBarLabel: '關於',
    title: '關於',
  };

  render() {
    return (
      <ABLMCCWrapper>
        <Text style={this.props.style}>About</Text>
      </ABLMCCWrapper>
    );
  }
}
