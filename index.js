/* @flow */
/**
 * @Arcaneless
 */
'use strict'

// Importing process
import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Button from 'react-native-material-button';
import { BlurView, VibrancyView } from 'react-native-blur';
import Drawer from 'react-native-drawer';
var DomParser = require('react-native-html-parser').DOMParser;

import ErrorPage from './subpages/ErrorPage';
import Loading from './subpages/Loading';

// Tabs
import NormalNews from './subpages/NormalNews';
import Notices from './subpages/Notices';
import About from './subpages/About';
import SchoolCalendar from './subpages/SchoolCalendar';
import Assignments from './subpages/Assignments';

import ABLMCCInterface from './ABLMCCInterface';
var aInterface = new ABLMCCInterface();

import styles from './styles.js';


// Define some useful constant
var ABLMCC: Document = null;
const screenWidth = Dimensions.get('window').width;
const navHeight = Platform.OS == 'ios' ? 64 : 54;

// ABLMCC Server status
var ablmcc = {isDown: false,
              checkedStatus: false};

export default class ABLMCCPlus extends Component {
  render() {

    return (<ABLMCCPlusNav screenProps={{face: aInterface}} />);
  }
}


// Navigator main
const ABLMCCPlusNav = TabNavigator({
  NormalNews: {
    screen: NormalNews
  },
  Notices: {
    screen: Notices
  },
  About: {
    screen: About
  },
  SchoolCalendar: {
    screen: SchoolCalendar
  },
  Assignments: {
    screen: Assignments
  },
});

AppRegistry.registerComponent('ABLMCCPlus', () => ABLMCCPlus);
