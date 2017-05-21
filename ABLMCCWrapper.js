import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  View,
  Image,
} from 'react-native';
import { BlurView, VibrancyView } from 'react-native-blur';
const navHeight = Platform.OS == 'ios' ? 64 : 54;

export default class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image source={require('./img/app_bg2_1.png')} style={{
        flex: 1,
        width: null,
        height: null
      }}>
        <BlurView blurType="light" blurAmount={5} style={{flex: 1,
        width: null,
        height: null}} >
          <View style={{paddingTop: navHeight}}>
            {this.props.children}
          </View>
        </BlurView>
      </Image>
    );
  }
}
