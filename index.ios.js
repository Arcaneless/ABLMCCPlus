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

import NormalNews from './subpages/NormalNews';
import Notices from './subpages/Notices';
import Activities from './subpages/Activities';
import Career from './subpages/Career';
import Assignments from './subpages/Assignments';

import styles from './styles.js';

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

class NavigatorPlus extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.refE(this.getNav());
  }

  renderScene(route, navigator) {
  	return (<route.component {...route.passProps} navigator={navigator} style={{paddingTop: navHeight}} />);
  }

  getNav() {
    console.log('navvvvvvvv' + this._nav);
    return this._nav;
  }

  render() {
    console.log('Startup render');
    return (
      <Navigator
        ref={(ref) => this._nav = ref}
        initialRoute={{ name: 'NormalNews', component: NormalNews }}
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

const listContent = new Map([['一般宣布', NormalNews], ['通告', Notices], ['活動', Activities], ['升學擇業', Career], ['電子家課冊', Assignments]]);
class Menu extends Component {
  constructor(props) {
    super(props);
  }

  onPressList(o) {
    console.log(o + ' :::::: ' + listContent.get(o));
    this.props.nav.resetTo({ name: o, component: listContent.get(o) });
    this.props.drawer.close();
  }

  render() {
    //console.log(this.props.nav);
    console.log('drawer' + this.props.drawer);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dss = ds.cloneWithRows(Array.from(listContent.keys()));
    console.log('Menu render');
    return (
      <View style={[styles.menu, {paddingTop: navHeight/5, flex: 1}]}>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('./img/ablmccIcon.png')} style={{
            resizeMode: 'stretch',
            width: 40,
            height: 40,}} />
          <Text style={{fontSize: 20, color: '#03A9F4', paddingTop: 8, fontFamily: 'Raleway-Light'}}>  ABLMCC浸中</Text>
        </View>
        <ListView dataSource={dss} style={{alignSelf: "stretch"}}
          renderRow={(o) => (
            <View>
              <TouchableHighlight underlayColor={'#E0E0E0'} onPress={ () => this.onPressList(o) } style={{padding: 10, alignItems: 'center'}}>
                <Text>{o}</Text>
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
      update: false,
      nav: undefined,
    };
    this._drawer = undefined;
  }

  componentDidMount() {
    //getABLMCC((p) => this.setState({update: true}));
  }

  getDrawer() {
    return this._drawer;
  }

  getNav() {
    return this.state.nav;
  }

  render() {
    console.log('Init render');
    console.log('kdsjhlfhld' + this.state.nav);
    return (
      <Drawer
        nav={this.getNav()}
        ref={(ref) => this._drawer = ref}
        type="overlay"
        content={(<Menu nav={this.getNav()} drawer={this.getDrawer()}/>)}
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
          <NavigatorPlus menu={() => this.getDrawer().open()} refE={(ref) => this.setState({nav: ref})} />
      </Drawer>
    );
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 0},
  mainOverlay: {backgroundColor: '#000000', opacity: 0},
}

AppRegistry.registerComponent('ABLMCCPlus', () => ABLMCCPlus);
