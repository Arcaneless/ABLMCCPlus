import React, { Component } from 'react';
import {
  WebView,
  ScrollView,
  Text,
  Dimensions,
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

  render() {
    //console.log(this.props.value);
    if(this.state.path != undefined) {
      return (
        <Pdf ref={(pdf) => {this.pdf = pdf}}
             source={this.state.path}
             page={1}
             scale={1}
             horizontal={false}
             onLoadComplete={(pageCount, pdfPath) => {
                //this.setState({pageCount: pageCount});
                console.log(`total page count: ${pageCount} path:${pdfPath}`);
             }}
             onPageChanged={(page,pageCount) => {
                //this.setState({page:page});
                //console.log(`current page: ${page}`);
             }}
             onError={(error) => {
                console.log(error);
             }}
             style={{
               flex:1,
               width:Dimensions.get('window').width,
             }}
        />
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
