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
var norNews = null;

function getNorNews(callback) {
  return fetch('http://web.ablmcc.edu.hk/Content/08_others/01_what_is_new/index.aspx')
          .then((r) => r.text())
          .then((rt) => {
            let doc = new DomParser().parseFromString(rt);
            console.log(doc);
            norNews = doc;
            callback(doc);
            return doc;
          })
          .catch((err) => console.error(err));
}

export default class NormalNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false
    };
  }

  componentDidMount() {
    //getNorNews((p) => this.setState({update: true}));
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
    if(true) {
      console.log('normal news render');
      //console.log(a);
      //let a = norNews.getElementsByClassName('latestNews')[0];//getElementById('ctl00_tableBorder').getElementsByTagName('table');
      //let l = a.length;
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      let p = [...Array(5)].map((x, i) => x = i);
      const dss = ds.cloneWithRows(p.map(String));

      //console.log(a);
      return (
        <ABLMCCWrapper render={(
          <ListView style={this.props.style} dataSource={dss}
            renderRow={(o) => (
              <View>
                <Text>HAHA</Text>
                {/* <TouchableOpacity style={[styles.normalNews, styles.separator]} onPress={this.onPress()}>
                  <Text style={styles.normalNews.left}>{a[parseInt(o) + 2].childNodes[2].firstChild.firstChild.nodeValue}</Text>
                  <Text style={styles.normalNews.right}>{a[parseInt(o) + 2].childNodes[1].firstChild.nodeValue}</Text>
                </TouchableOpacity> */}
                <View style={styles.seperator}></View>
              </View>
            )}
          />
        )} />
      );
    } else {
      return (
        <ABLMCCWrapper render={(
          <Text>Loading...</Text>
        )} />
      );
    }
  }
}
