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
import {
  TabNavigator,
  StackNavigator
} from 'react-navigation';

import ErrorPage from './subpages/ErrorPage';
import Loading from './subpages/Loading';

// Tabs
import NormalNews from './subpages/NormalNews';
import Notices from './subpages/Notices';
import About from './subpages/About';
import SchoolCalendar from './subpages/SchoolCalendar';
import Assignments from './subpages/Assignments';
import APDFView from './APDFView';

import ABLMCCInterface from './ABLMCCInterface';
var aInterface = new ABLMCCInterface();

import log from './Logger';
const Logger = new log();
const commonLog = Logger.logging();

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
    Logger.logINFO(commonLog.indexRender());
    return (<ABLMCCPlusNav screenProps={{face: aInterface}} />);
  }
}


const NormalNewsc = StackNavigator({
  Home: { screen: NormalNews },
  PDFView: { screen: APDFView },
});

const Noticesc = StackNavigator({
  Home: { screen: Notices },
  PDFView: { screen: APDFView },
});

const Aboutc = StackNavigator({
  Home: { screen: About },
});

const SchoolCalendarc = StackNavigator({
  Home: { screen: SchoolCalendar },
});

const Assignmentsc = StackNavigator({
  Home: { screen: Assignments },
});

// Navigator main
const ABLMCCPlusNav = TabNavigator({
  NormalNews: {
    screen: NormalNewsc
  },
  Notices: {
    screen: Noticesc
  },
  About: {
    screen: Aboutc
  },
  SchoolCalendar: {
    screen: SchoolCalendarc
  },
  Assignments: {
    screen: Assignmentsc
  },
}, {
  lazy: true
});

AppRegistry.registerComponent('ABLMCCPlus', () => ABLMCCPlus);
