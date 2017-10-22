import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  View,
  ImageBackground,
} from 'react-native';
import { BlurView, VibrancyView } from 'react-native-blur';
const navHeight = Platform.OS == 'ios' ? 64 : 54;

// The main frame style of the app
export default class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground source={require('./img/app_bg2_1.png')} style={{
        flex: 1,
        width: null,
        height: null
      }}>
        <BlurView blurType="light" blurAmount={5} style={{flex: 1,
        width: null,
        height: null}} >
          <View>
            {this.props.children}
          </View>
        </BlurView>
      </ImageBackground>
    );
  }
}
