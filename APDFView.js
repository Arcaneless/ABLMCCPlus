import React, { Component } from 'react';
import {
  WebView,
  ScrollView,
  Text,
} from 'react-native';
import ABLMCCWrapper from './ABLMCCWrapper';
import RNFetchBlob from 'react-native-fetch-blob'
import PDFView from 'react-native-pdf-view';

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
      count: 2,
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

  render() {
    console.log(this.props.value);
    if(this.state.path != undefined) {
      return (
        <PDFView ref={(pdf) => this._pdfView = pdf}
                       src={this.state.path}
                       onLoadComplete = {(pageCount)=>{
                          this._pdfView.setNativeProps({
                              zoom: 1,
                          });
                       }}
                       style={{flex: 1}}
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
