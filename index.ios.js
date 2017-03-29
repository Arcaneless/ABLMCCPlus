/**
 * @Arcaneless
 */
'use strict'

import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { BlurView, VibrancyView } from 'react-native-blur';
import Drawer from 'react-native-drawer';

var DomParser = require('react-native-html-parser').DOMParser;
import styles from './styles.js';

import NormalNews from './NormalNews';

var ABLMCC: Document = null;
const screenWidth = Dimensions.get('window').width;
const navHeight = Platform.OS == 'ios' ? 64 : 54;

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
        {/* <NormalNews style={this.props.style}/> */}
        </BlurView>
      </Image>
    );
  }
}

class NavigatorPlus extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
  	return (<route.component {...route.passProps} navigator={navigator} style={{paddingTop: navHeight}} />);
  }

  render() {
    console.log('Startup render');
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
                } else {
                  return (
                    <TouchableOpacity
                       onPress={() => { this.props.menu(); }} style={{paddingLeft: 10, paddingTop: navHeight/14}}>
                       <Image source={require('./img/hamIcon.png')} style={styles.hamButton} />
                     </TouchableOpacity>
                  );
                }
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
                    <Image source={require('./img/ablmccIcon.png')} style={[styles.icon, {paddingTop: navHeight/10}]} />
                    <Text style={[styles.title, {paddingTop: navHeight/10}]}>香港仔浸信會呂明才書院{'\n'}Aberdeen Baptist Lui Ming Choi College</Text>
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

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  onPressList() {

  }

  render() {
    const listContent = ['一般宣布', '2', '3', '4', '5'];
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dss = ds.cloneWithRows(listContent);
    console.log('Menu render');
    return (
      <View style={[styles.menu, {paddingTop: navHeight/5}]}>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('./img/ablmccIcon.png')} style={{
            resizeMode: 'stretch',
            width: 40,
            height: 40,}} />
          <Text style={{fontSize: 20, color: '#03A9F4', paddingTop: 8, fontFamily: 'Raleway-Light'}}>  ABLMCC浸中</Text>
        </View>
        <ListView dataSource={dss} style={{flexDirection: 'row', flex: 1}}
          renderRow={(o) => (
            <View style={{flexDirection: 'row', flex: 1}}>
              <TouchableHighlight activeOpacity={0.1} underlayColor={'black'} onPress={ () => this.onPressList() } >
                <View style={{padding: 5}}>
                  <Text>{o}</Text>
                  <View style={styles.seperator.grey} ></View>
                </View>
              </TouchableHighlight>
            </View>
          )}
        />
      </View>
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

  render() {
    console.log('Init render');
    const o = <Menu />;
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        content={o}
        negotiatePan={true}
        tapToClose={true}
        openDrawerOffset={0.4} // 20% gap on the right side of drawer
        panOpenMask={0.5}
        panCloseMask={0.5}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          mainOverlay: {opacity:(ratio/2)},
        })}
        tweenDuration={200}
        >
          <NavigatorPlus menu={() => this._drawer.open()}/>
      </Drawer>
    );
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 0},
  mainOverlay: {backgroundColor: '#000000', opacity: 0},
}

AppRegistry.registerComponent('ABLMCCPlus', () => ABLMCCPlus);
