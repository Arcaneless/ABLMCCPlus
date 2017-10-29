import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Navigator,
  TouchableOpacity,
  Clipboard,
  Alert
} from 'react-native';
import ABLMCCWrapper from '../ABLMCCWrapper';
var DomParser = require('react-native-html-parser').DOMParser;
import styles from '../styles.js';

function arrayOfCategory(array) {
  return [...Array(array.length)].map((x, i) => x = array[i].category);
}

//todo
export default class About extends Component {
  static navigationOptions = {
    title: '關於',
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],     // resource set
      clicked: [],  // set of boolean
    };
  }

  componentDidMount() {
    let face = this.props.screenProps.face;
    face.getContactInfo(i => this.setState({
      data: i,
      clicked: Array(i.length).fill(false),
    }));

  }

  onPressCategory(categoryList, o) {
    let buffer = this.state.clicked;
    buffer[categoryList.indexOf(o)] = !this.state.clicked[categoryList.indexOf(o)];
    this.setState({
      clicked: buffer,
    });
  }

  setClipboard(o) {
    Clipboard.setString(o.email);
    Alert.alert(
      'Copied!',
      `Copied ${o.name}\'s email`,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: true }
    );
  }

  render() {
    if (this.state.data.length == 0) return (<View></View>);

    console.log(this.state.data);
    let dataBuffer = this.state.data;
    const categoryList = arrayOfCategory(dataBuffer);
    const baseSourceTemplate = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const categoryListData = baseSourceTemplate.cloneWithRows(categoryList);

    return (
      <ABLMCCWrapper>
        <ListView dataSource={categoryListData} //*style={{height: '60%'}}
          renderRow={(o) => (
            <View>
              <TouchableOpacity onPress={() => this.onPressCategory(categoryList, o)} style={[styles.contactCategory]} >
                <Text style={styles.contactCategoryText}>{o}</Text>
              </TouchableOpacity>
              <View>
                {this.state.clicked[categoryList.indexOf(o)] ? (
                  <ListView dataSource={baseSourceTemplate.cloneWithRows(dataBuffer[categoryList.indexOf(o)].list)}
                    renderRow={(o2) => (
                      <TouchableOpacity onPress={() => this.setClipboard(o2)} style={styles.contact}>
                        <Text style={styles.assFont}>{o2.name}</Text>
                        <Text style={styles.assFont}>{'Email: ' + o2.email}</Text>
                      </TouchableOpacity>
                    )}
                  />
                ) : (
                  <View style={styles.contact}>
                  </View>
                )}
              </View>
            </View>
          )}
        />
      </ABLMCCWrapper>
    );
  }
}
