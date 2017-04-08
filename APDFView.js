import React, { Component } from 'react';
import {
  WebView,
  ScrollView,
  Text,
} from 'react-native';
import ABLMCCWrapper from './ABLMCCWrapper';
import RNFetchBlob from 'react-native-fetch-blob'
import PDFView from 'react-native-pdf-view';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


function download(url, callback) {
  RNFetchBlob
  .config({
    fileCache : true,  //Stored file: true
    appendExt : 'pdf',
  })
  .fetch('GET', url, {})
  .then((res) => {
    console.log('The file saved to ', res.path());  // the temp file path
    callback(res.path());
  });
}

export default class APDFView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: undefined,
      page: 1,
      pageCount: 0,
    }
  }

  componentDidMount() {
    download(this.props.value, (path) => this.setState({path: path}));
  }

  componentWillUnmount() {
    RNFetchBlob.fs.unlink(this.state.path).then(() => {
      console.log('unlinked pdf');
    });
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
        <PDFView ref={(pdf) => this._pdfView = pdf}
          src={this.state.path}
          pageNumber={this.state.page}
          onLoadComplete = {(pageCount)=>{
            this.setState({pageCount: pageCount});
            this._pdfView.setNativeProps({
              zoom: 1,
            });
          }}
          style={{flex: 1}}
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
