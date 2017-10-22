import React, { Component } from 'react';
import {
  Dimensions,
  Text,
  View,
  ListView,
  Navigator,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import ABLMCCWrapper from '../ABLMCCWrapper';
var DomParser = require('react-native-html-parser').DOMParser;
import styles from '../styles.js';

const screenHeight = Dimensions.get('window').height;

function concatArray(arrayCallback) {
  return arrayCallback.today.concat(arrayCallback.next, arrayCallback.nextnext);
}

export default class Assignments extends Component {
  static navigationOptions = {
    tabBarLabel: '電子家課冊',
    title: '電子家課冊'
  };

  constructor(props) {
    super(props);
    this.state = {
      currentSelected: '選擇班別',
      isOpening: false,
      chosen: false,
      data: {},
    }
  }

  onSelect(className) {
    let face = this.props.screenProps.face;
    this.setState({currentSelected: className});
    face.getHomework(className, (d) => this.setState({chosen: true, data: d}));
    return true;
  }

  toogleDropdown() {
    this.setState({isOpening: !this.state.isOpening});
  }

  dropdownRenderRow(rowData, rowID, highlighted) {
    return (
      <TouchableHighlight underlayColor='#E0E0E0' style={{padding: 7}}>
          <Text key={rowID} style={[styles.selectListText, highlighted && {color: '#EF5350'}]}>{rowData}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    console.log('ASS' + this.state.chosen);
    let list = [...Array(12)].map((x, i) => {
                  let n = parseInt(i/4)+1, a = String.fromCharCode('A'.charCodeAt(0)+i%4);
                  return n+a;});
    let array = this.state.chosen ? concatArray(this.state.data) : [];
    const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(array);
    return (
      <ABLMCCWrapper>
        <View style={{padding: 20}}>
          <ModalDropdown options={list} style={this.state.isOpening ? styles.selectFocus : styles.select} dropdownStyle={styles.selectList} onSelect={(i, v) => this.onSelect(v)}
            renderSeparator={() => <View></View>} onDropdownWillShow={() => this.toogleDropdown()} onDropdownWillHide={() => this.toogleDropdown()} renderRow={this.dropdownRenderRow.bind(this)}>
            <View style={styles.selectText}>
              <Text>{this.state.currentSelected}</Text>
              {!this.state.isOpening && <Image source={require('../img/dropdown.png')} style={{
                alignSelf: 'flex-end',
                resizeMode: 'stretch',
                width: 10,
                height: 10,}} />}
            </View>
            <View style={styles.selectSeperator}></View>
          </ModalDropdown>
          {this.state.chosen &&
            <View style={{paddingTop: 5}}>
              {/* Today */}
              <ListView dataSource={dss} //*style={{height: '60%'}}
                renderRow={(o) => typeof o == 'object' ? (
                  <View>
                    <View style={styles.assignment}>
                      <Text style={styles.assFont}>{o.subject + '  ' + o.summary}</Text>
                      <Text style={styles.assFont}>{'提交日期: ' + o.date}</Text>
                    </View>
                    <View style={styles.seperator}></View>
                  </View>
                ) : (
                  <View style={styles.assignment}>
                    <Text style={styles.assFont}>{o}</Text>
                  </View>
                )}
              />
            </View>
          }
        </View>
      </ABLMCCWrapper>
    );
  }
}
