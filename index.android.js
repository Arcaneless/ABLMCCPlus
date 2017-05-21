/* @flow */
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
  TouchableHighlight
} from 'react-native';
import Button from 'react-native-material-button';
import { BlurView, VibrancyView } from 'react-native-blur';
import Drawer from 'react-native-drawer';
var DomParser = require('react-native-html-parser').DOMParser;

import ErrorPage from './subpages/ErrorPage';
import Loading from './subpages/Loading';

import NormalNews from './subpages/NormalNews';
import Notices from './subpages/Notices';
import Activities from './subpages/Activities';
import SchoolCalendar from './subpages/SchoolCalendar';
import Assignments from './subpages/Assignments';
import ABLMCCInterface from './ABLMCCInterface';
var aInterface = new ABLMCCInterface();

import styles from './styles.js';

var ABLMCC: Document = null;
const screenWidth = Dimensions.get('window').width;
const navHeight = Platform.OS == 'ios' ? 64 : 54;
var ablmcc = {isDown: false,
              checkedStatus: false};

class NavigatorPlus extends Component {
  constructor(props) {
    super(props);
    //this.props.ref(this);
  }

  componentDidMount() {
    this.props.refE(this.getNav());
  }

  renderScene(route, navigator) {
    console.log('render scene');
  	return ablmcc.checkedStatus
            ? (ablmcc.isDown ? (<ErrorPage />) : (<route.component {...route.passProps} navigator={navigator} face={aInterface} />))
            : (<Loading />);
  }

  getNav() {
    console.log('nav ' + this._nav);
    return this._nav;
  }

  render() {
    console.log('Startup render');
    return (
      <Navigator
        ref={(ref) => this._nav = ref}
        initialRoute={{ name: 'NormalNews', component: NormalNews, passProps: {depth: 0}}}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {
                if(index > 0) {
                  return (
                    <TouchableHighlight
                      style={{paddingLeft: navHeight/6}}
                       underlayColor="transparent"
                       onPress={() => { if (index > 0) { navigator.pop() } }}>
                       <Image source={require('./img/back.png')} style={{height: navHeight/2, width: navHeight/2}} />
                     </TouchableHighlight>
                    )
                } else {
                  return (
                    <TouchableOpacity
                       onPress={() => { this.props.menu().open(); }} style={{paddingLeft: 10, paddingTop: navHeight/14}}>
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
        onDidFocus={() => {
          this.props.master().getDepth();
        }}
      />
    );
  }
}

const listContent = new Map([['一般宣布', NormalNews], ['通告', Notices], ['活動', Activities], ['校曆', SchoolCalendar], ['電子家課冊', Assignments]]);
class Menu extends Component {
  constructor(props) {
    super(props);
  }

  onPressList(o) {
    console.log(o + ' ----> ' + listContent.get(o));
    if(o == '通告') this.props.nav.resetTo({ name: o, component: listContent.get(o) , passProps: {year: 0}});
    else this.props.nav.resetTo({ name: o, component: listContent.get(o) });
    this.props.drawer.close();
  }

  onPressSettings() {
    this.props.drawer.close();
  }

  render() {
    //console.log(this.props.nav);
    //console.log('drawer' + this.props.drawer);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dss = ds.cloneWithRows(Array.from(listContent.keys()));
    console.log('Menu render');
    return (
      <View style={[styles.menu, {paddingTop: navHeight/5, flex: 1, flexDirection: 'column'}]}>
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
              <Button onPressOut={() => this.onPressList(o)} withRipple={true} style={{padding: 10, alignItems: 'center'}}>
                <Text>{o}</Text>
              </Button>
            </View>
          )}
        />
        <Button onPressOut={() => this.onPressSettings()} withRipple={true} style={{backgroundColor: 'transparent', flexDirection: 'row', alignSelf: 'stretch', padding: navHeight/5}}>
          <Image source={require('./img/gear.png')} style={[styles.settingsImage]} />
          <Text style={{fontSize: 17, paddingTop: 4, paddingLeft: screenWidth*.16}}>設定</Text>
        </Button>
      </View>
    );
  }
}

class MenuR extends Component {
  constructor(props) {
    super(props);
  }

  onPressList(o) {
    this.props.nav.resetTo({
       name: '通告',
       component: Notices,
       passProps: {
         year: o
       }
     });
    this.props.drawer.close();
  }

  render() {
    let yr = new Date().getFullYear();
    let month = new Date().getMonth();
    let nearest = month<9 ? yr : yr+1;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dss = ds.cloneWithRows([...Array(nearest-2008)].map((x, i) => x = 2008+i));
    return (
      <View style={[styles.menu, {paddingTop: navHeight/5, flex: 1, flexDirection: 'column'}]}>
        <ListView dataSource={dss} style={{alignSelf: "stretch"}}
          renderRow={(o) => (
            <View>
              <Button onPressOut={() => this.onPressList(o)} withRipple={true} style={{padding: 10, alignItems: 'center'}}>
                <Text>{o}-{o+1} 年度</Text>
              </Button>
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
    aInterface.checkAvailability(state => {
      ablmcc.isDown = !state;
      ablmcc.checkedStatus = true;
      if(ablmcc.isDown) this.getNav().resetTo({ name: "ErrorPage", component: ErrorPage });
    });
    this.state = {
      update: false,
      nav: undefined,
      o: false,
      oR: false,
    };
    this._drawer = undefined;
  }

  getDepth() {
    if(this.getNav() != undefined && this.getNav().getCurrentRoutes().length==1) this.setState({o: false});
    else if(this.getDrawer() != undefined) this.setState({o: true});
    if(this.getNav() != undefined && this.getNav().getCurrentRoutes()[0].name == '通告') {
      console.log('in2');
      this.setState({oR: false});
    } else {
      console.log('out2');
      this.setState({oR: true});
    }
  }

  getDrawer() {
    return this._drawer;
  }

  getDrawerR() {
    return this._drawerR;
  }

  getNav() {
    return this.state.nav;
  }

  getSelf() {
    return this;
  }

  render() {
    console.log('Main render');
    return (
      <Drawer
        side={'left'}
        ref={(ref) => this._drawer = ref}
        type="overlay"
        disabled={this.state.o}
        content={(<Menu nav={this.getNav()} drawer={this.getDrawer()}/>)}
        negotiatePan={true}
        tapToClose={true}
        openDrawerOffset={0.4} //open 60%
        panOpenMask={0.5}
        panCloseMask={0.5}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          mainOverlay: {opacity:(ratio/2)},
        })}
        tweenDuration={200}
        >
          <Drawer
            side={'right'}
            ref={(ref) => this._drawerR = ref}
            type="overlay"
            disabled={this.state.oR}
            content={(<MenuR nav={this.getNav()} drawer={this.getDrawerR()} />)}
            negotiatePan={true}
            tapToClose={true}
            openDrawerOffset={0.4} //open 60%
            panOpenMask={0.5}
            panCloseMask={0.5}
            closedDrawerOffset={-3}
            styles={drawerStyles}
            tweenHandler={(ratio) => ({
              mainOverlay: {opacity:(ratio/2)},
            })}
            tweenDuration={200}
            >
              <NavigatorPlus menu={() => this.getDrawer()} refE={(ref) => this.setState({nav: ref})} master={() => this.getSelf()} />
          </Drawer>
      </Drawer>
    );
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 0},
  mainOverlay: {backgroundColor: '#000000', opacity: 0},
}

AppRegistry.registerComponent('ABLMCCPlus', () => ABLMCCPlus);
