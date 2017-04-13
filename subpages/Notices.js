'use strict'
import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Navigator,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import Button from 'react-native-material-button';
import ABLMCCWrapper from '../ABLMCCWrapper';
import APDFView from '../APDFView';
var DomParser = require('react-native-html-parser').DOMParser;
import styles from '../styles';

export default class Notices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: undefined,
      waiting: false,
      year: this.props.year,
      loaded: 20,
    };
  }

  fetchData() {
    this.props.face.getNotices((j) => {
      this.setState({info: j, waiting: false});
    }, 0, this.state.loaded, this.state.year);
    this.setState({loaded: this.state.loaded+10});
  }

  componentDidMount() {
    this.fetchData();
  }

  onPress(o) {
    this.gotoNext(APDFView, 'http://web.ablmcc.edu.hk'+this.state.info.content[o].href);
  }

  gotoNext(component, v) {
   this.props.navigator.push({
      name: 'APDFView',
      component: component,
      passProps: {
        depth: 1,
        id: '1',
        value: v,
      }
    });
  }

  loadMoreContentAsync = async () => {
    console.log('more');
    if (!this.state.waiting) {
        this.setState({waiting: true});
        this.fetchData();
    }
  }

  renderFooter() {
    if (this.state.waiting) {
        return <ActivityIndicator />;
    } else {
        return <Text>~</Text>;
    }
  }

  render() {
    if(this.state.info != undefined) {
      console.log('notices render');
      let obj = this.state.info.content;
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      let p = [...Array(obj.length)].map((x, i) => x = i);
      const dss = ds.cloneWithRows(p.map(String));

      return (
        <ABLMCCWrapper render={(
          <ListView style={this.props.style}
            renderScrollComponent={props => <InfiniteScrollView {...props} />} distanceToLoadMore={-20}
            dataSource={dss}
            canLoadMore={true}
            onLoadMoreAsync={() => this.loadMoreContentAsync()}
            renderRow={(o) => (
              <View>
                <TouchableOpacity onPress={() => this.onPress(o)} style={styles.normalNews} >
                  <Text style={styles.normalNews.left}>{obj[o].text}</Text>
                  <Text style={styles.normalNews.right}>{obj[o].date}</Text>
                </TouchableOpacity>
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
