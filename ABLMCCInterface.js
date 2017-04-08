'use strict'
var DomParser = require('react-native-html-parser').DOMParser;

export default class ABLMCCInterface {
  constructor() {
    this.ablmcc = new Map([['NormalNews', undefined],['Notices', undefined],['Activities', undefined],['Career', undefined],['Assignments', undefined]]);
    this.requested = new Map([['NormalNews', false],['Notices', 10],['Activities', false],['Career', false],['Assignments', false]]);
  }

  getABLMCC(url, callback) {
    return fetch(url)
            .then((r) => r.text())
            .then((rt) => {
              let doc = new DomParser().parseFromString(rt);
              //console.log(doc);
              callback(doc);
              return doc;
            })
            .catch((err) => console.error(err));
  }

  getNormalNews(callback) {
    if(this.ablmcc.get('NormalNews')===undefined) {
      this.requested.set('NormalNews', true);
      this.getABLMCC('http://web.ablmcc.edu.hk/Content/08_others/01_what_is_new/index.aspx', (d) => {
        let table = d.getElementByClassName('latestNews').childNodes;
        var json = {'content': []};
        //HTML Finding
        for(let i=2, p=0; i<table.length-1; i++) {
          let ele = table[i];
          let date = ele.childNodes[1].firstChild.nodeValue;
          let caption = ele.childNodes[2].firstChild.firstChild.nodeValue;
          let ele2 = ele.childNodes[2].childNodes[2];
          if(ele2 != undefined) {
            let ele3 = ele2.childNodes;
            for(let j=1; j<ele3.length-1; j++) {
              let ele4 = ele3[j].childNodes[1].firstChild;
              let text = ele4.firstChild.nodeValue;
              let href = ele4.attributes[0].nodeValue;
              href = href.replace('../../..', '');
              if(ele3.length==3) text = caption;
              else text = caption + ' ' + text;
              json.content[p] = {'text': text, 'date': date, 'href': href};
              p++;
            }
          }
        }
        this.ablmcc.set('NormalNews', json);
        callback(json);
      });
    } else if(this.requested.get('NormalNews')===true) {
      callback(this.ablmcc.get('NormalNews'));
    }
  }

  getNotices(callback, lower, upper) {
    if(this.ablmcc.get('Notices')===undefined || this.requested.get('Notices')<upper) {
      this.requested.set('Notices', true);
      this.getABLMCC('http://web.ablmcc.edu.hk/Content/07_parents/notice/index.aspx', (d) => {
        let table = d.getElementByClassName('noticeList').childNodes;
        var json = {'content': []};
        //HTML Finding
        for(let i=(lower<2 ? 2 : lower), p=0; i<(upper+2<table.length-1 ? upper+2 : table.length-1); i++) {
          let ele = table[i];
          let date = ele.childNodes[1].firstChild.nodeValue;
          let caption = ele.childNodes[2].firstChild.firstChild.nodeValue;
          let href = ele.childNodes[2].firstChild.attributes[0].nodeValue;
          href = href.replace('../../..', '');
          json.content[p++] = {'text': caption, 'date': date, 'href': href};
        }
        this.ablmcc.set('Notices', json);
        callback(json);
      });
    } else {
      callback(this.ablmcc.get('Notices'));
    }
  }
}
