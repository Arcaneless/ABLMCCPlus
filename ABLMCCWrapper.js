import React, { Component } from 'react';
import {
  View,
  Platform,
  Dimensions,
  Image,
  ImageBackground,
  findNodeHandle,
} from 'react-native';
import { BlurView } from 'react-native-blur';
const navHeight = Platform.OS == 'ios' ? 64 : 54;
const screenWidth = Dimensions.get('window').width;


// The main frame style of the app
export default class ABLMCCWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {viewRef: null};
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  render() {
    return (
      <View style={{
        flex:1,
        flexDirection: 'row',
        alignSelf: "stretch"
      }}>
        <Image
            ref={(img) => { this.backgroundImage = img; }}
            source={require('./img/app_bg2_1.png')}
            style={{
                position: "absolute",
                top: 0, left: 0, bottom: 0, right: 0,
                flex: 1,
                width: null,
                height: null
            }}
            onLoadEnd={this.imageLoaded.bind(this)}
        />
        {(this.state.viewRef == null ? null :
        <BlurView
            style={{
                position: "absolute",
                top: 0, left: 0, bottom: 0, right: 0,
                flex: 1,
                width: null,
                height: null
            }}
            viewRef={this.state.viewRef}
            blurType="light"
            blurAmount={5}
        />)}
        <View style={{flex:1,flexDirection: 'column',}}>
          {this.props.children}
        </View>
      </View>
    );
  }
}
