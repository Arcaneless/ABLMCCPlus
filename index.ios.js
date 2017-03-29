/**
 * @Arcaneless
 */
'use strict'

import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  Image,
  TouchableOpacity
} from 'react-native';
import { BlurView, VibrancyView } from 'react-native-blur';
import SideMenu from 'react-native-side-menu';

var DomParser = require('react-native-html-parser').DOMParser;
import styles from './styles.js';

import NormalNews from './NormalNews';

var ABLMCC: Document = null;

function getABLMCC(callback) {
  return fetch('http://web.ablmcc.edu.hk/index/index18.aspx')
          .then((r) => r.text())
          .then((rt) => {
            let doc = new DomParser().parseFromString(rt);
            console.log(doc);
            ABLMCC = doc;
            callback(doc);
            return doc;
          })
          .catch((err) => console.error(err));
}

class MainPage extends Component {
  constructor(props) {
    super(props);
    console.log('MainPage load');
  }

  onPress() {
  	alert("YO FROM RIGHT BUTTON");
  }

  gotoNext(component) {
   this.props.navigator.push({
      component: component,
      passProps: {
        id: '0',
      },
      onPress: this.onPress,
      rightText: ''
    })
  }

  render() {
    console.log('MainPage render');
    return (
      <Image source={require('./img/app_bg2_1.png')} style={{
        flex: 1,
        width: null,
        height: null
      }}>
        <BlurView blurType="light" blurAmount={5} style={{flex: 1,
        width: null,
        height: null}} >
        <NormalNews style={this.props.style}/>
        </BlurView>
      </Image>
    );
  }
}

export default class ABLMCCPlus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false
    };
  }

  componentDidMount() {
    //getABLMCC((p) => this.setState({update: true}));
  }

  renderScene(route, navigator) {
  	return (<route.component {...route.passProps} navigator={navigator} style={Platform.OS == 'ios' ? {paddingTop: 64} : {paddingTop: 54}} />);
  }

  render() {
    console.log('Startup render');
    const routes = [
      {title: 'ABLMCC', index: 0},
      {title: 'ABLMCC', index: 1},
    ];
    return (
      <Navigator
        initialRoute={{ name: 'MainPage', component: MainPage }}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {
                if(index > 0) {
                  return (
                    <TouchableHighlight
                       underlayColor="transparent"
                       onPress={() => { if (index > 0) { navigator.pop() } }}>
                       <Text style={ styles.leftNavButtonText }>Back</Text>
                     </TouchableHighlight>
                    )
                } else { return null }
              },
              RightButton: (route, navigator, index, navState) => {
                if (route.onPress) return (
                  <TouchableHighlight
                    onPress={ () => route.onPress() }>
                    <Text style={ styles.rightNavButtonText }>{ route.rightText || 'Right Button' }</Text>
                  </TouchableHighlight>
                );
              },
              Title: (route, navigator, index, navState) => {
                return (
                  <View style={styles.titleM}>
                    <Image source={require('./img/ablmccIcon.png')} style={styles.icon} />
                    <Text style={ styles.title }>香港仔浸信會呂明才書院{'\n'}Aberdeen Baptist Lui Ming Choi College</Text>
                  </View>);
              },
              }}
          style={styles.nav}
          />
        }
      />
    );
  }
}

AppRegistry.registerComponent('ABLMCCPlus', () => ABLMCCPlus);
