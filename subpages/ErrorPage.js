import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  Platform
} from 'react-native';
import ABLMCCWrapper from '../ABLMCCWrapper';
var DomParser = require('react-native-html-parser').DOMParser;
import styles from '../styles.js';
const screenHeight = Dimensions.get('window').height;
const navHeight = Platform.OS == 'ios' ? 64 : 54;

export default class ErrorPage extends Component {
  render() {
    return (
      <ABLMCCWrapper>
        <View style={[styles.center, {marginTop: screenHeight/2 - navHeight - 50}]}>
          <Text>School website is down!{'\n'}校網暫時無法連接{'\n'}</Text>
          <Image source={require('../img/unavailable.png')} style={{
            width: 64,
            height: 64,
          }}/>
        </View>
      </ABLMCCWrapper>
    );
  }
}
