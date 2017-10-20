import React, { Component } from 'react';
import {
  WebView,
  ScrollView,
  Text,
} from 'react-native';
import ABLMCCWrapper from './ABLMCCWrapper';
//import RNFetchBlob from 'react-native-fetch-blob'
import Pdf from 'react-native-pdf';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export default class APDFView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: undefined,
      page: 1,
      pageCount: 1,
    }
    this.pdf = null;
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState({
      path: {uri: params.value},
    });
  }

  componentWillUnmount() {

  }

  onSwipe(gestureName, gestureState) {
    const {page, pageCount} = this.state;
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({page: page < pageCount ? page+1 : page});
        break;
      case SWIPE_DOWN:
        this.setState({page: page > 1 ? page-1 : page});
    }
  }

  render() {
    console.log(this.props.value);
    if(this.state.path != undefined) {
      return (
        <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        style={{
          flex: 1,
        }}
        >
          <Pdf ref={(pdf) => {this.pdf = pdf}}
               source={this.state.path}
               page={1}
               scale={1}
               horizontal={false}
               onLoadComplete={(pageCount, pdfPath) => {
                  this.setState({pageCount: pageCount});
                  console.log(`total page count: ${pageCount} path:${pdfPath}`);
               }}
               onPageChanged={(page,pageCount) => {
                  this.setState({page:page});
                  console.log(`current page: ${page}`);
               }}
               onError={(error) => {
                  console.log(error);
               }}
            />
        </GestureRecognizer>
      );
    } else {
      return (
        <ABLMCCWrapper render={(
          <Text>Loading...</Text>
        )}/>
      );
    }
  }
}
