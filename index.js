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

// Load Icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    screen: NormalNewsc,
    navigationOptions: {
      tabBarLabel: '一般宣布',
      tabBarIcon: ({ tintColor }) => (<Icon name="alert-box" size={30} color={tintColor} />),
    }
  },
  Notices: {
    screen: Noticesc,
    navigationOptions: {
      tabBarLabel: '通告',
      tabBarIcon: ({ tintColor }) => (<Icon name="newspaper" size={30} color={tintColor} />),
    }
  },
  About: {
    screen: Aboutc,
    navigationOptions: {
      tabBarLabel: '關於',
      tabBarIcon: ({ tintColor }) => (<Icon name="information-outline" size={30} color={tintColor} />),
    }
  },
  SchoolCalendar: {
    screen: SchoolCalendarc,
    navigationOptions: {
      tabBarLabel: '校曆',
      tabBarIcon: ({ tintColor }) => (<Icon name="calendar" size={30} color={tintColor} />),
    }
  },
  Assignments: {
    screen: Assignmentsc,
    navigationOptions: {
      tabBarLabel: '電子家課冊',
      tabBarIcon: ({ tintColor }) => (<Icon name="book-open" size={30} color={tintColor} />),
    },
  },
}, {
  lazy: true
});

AppRegistry.registerComponent('ABLMCCPlus', () => ABLMCCPlus);
