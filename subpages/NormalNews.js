import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Navigator,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';
import Button from 'react-native-material-button';
import ABLMCCWrapper from '../ABLMCCWrapper';
import APDFView from '../APDFView';
var DomParser = require('react-native-html-parser').DOMParser;
import styles from '../styles.js';
var norNews = null;

export default class NormalNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: undefined
    };
  }

  componentDidMount() {
    this.props.face.getNormalNews((j) => this.setState({info: j}));
  }

  onPress(o) {
    console.log(o);
    this.gotoNext(APDFView, 'http://web.ablmcc.edu.hk'+this.state.info.content[o].href);
  }

  gotoNext(component, v) {
   this.props.navigator.push({
      component: component,
      passProps: {
        depth: 1,
        id: '1',
        value: v,
      }
    })
  }

  render() {
    if(this.state.info != undefined) {
      console.log('normal news render');
      let obj = this.state.info.content;
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      let p = [...Array(obj.length)].map((x, i) => x = i);
      const dss = ds.cloneWithRows(p.map(String));

      //console.log(a);
      return (
        <ABLMCCWrapper render={(
          <ListView style={this.props.style} dataSource={dss}
            renderRow={(o) => (
              <View>
                <Button onPressOut={() => this.onPress(o)} withRipple={true} style={[styles.normalNews]} >
                  <Text style={styles.normalNews.left}>{obj[o].text}</Text>
                  <Text style={styles.normalNews.right}>{obj[o].date}</Text>
                </Button>
                <View style={styles.seperator}></View>
              </View>
            )}
          />
        )} />
      );
    } else {
      return (
        <ABLMCCWrapper render={(
          <View style={this.props.style}>
            <Text>Loading...</Text>
          </View>
        )} />
      );
    }
  }
}
