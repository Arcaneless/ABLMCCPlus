'use strict'
var DomParser = require('react-native-html-parser').DOMParser;

// Class convert to number for request of HTML
function classNameConvert(classname) {
    return (parseInt(classname)-1)*4 + (classname.charCodeAt(1)-65);
}

// Build homework JSON from html table element
function HWBuilder(table) {
  let result = [];
  for(let i=2, currentSubject='', p=0; i<table.length-1; i++) {
    let ele = table[i];
    let holder = ele.childNodes[1].firstChild;
    let subject = holder == null ? currentSubject : holder.nodeValue;
    if(currentSubject != subject) currentSubject = subject;
    let date = ele.childNodes[2].firstChild.firstChild.nodeValue;
    let summary = ele.childNodes[2].lastChild.firstChild.nodeValue;
    result[p++] = {'subject': subject, 'summary': summary, 'date': date};
  }
  return result;
}

// Check if the server is down
function checkAvailability() {
  const timeout = new Promise((resolve, reject) => {
      setTimeout(reject, 500, 'Request timed out');
  });

  const request = fetch('http://web.ablmcc.edu.hk/index/index18.aspx?nnnid=1');

  return Promise
      .race([timeout, request])
      .then(response => {
        console.log('server is online'); return true;
      })
      .catch(error => {
        console.log('server is down'); return false;
      });
}

function getABLMCC(url, callback) {
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


/*
  get ABLMCC notices from user enter year
  @Param {Number} year - year chosen
  @Param {Callback} callback - the callback
  @Return {Promise} fetch - the fetching
*/
function getABLMCCNotices(year, callback) {
  return fetch('http://web.ablmcc.edu.hk/Content/07_parents/notice/index.aspx')
          .then((r) => r.text()).then((rt) => {
            let doc = new DomParser().parseFromString(rt);
            let target = "ctl00%24ContentPlaceHolder1%24ddlstSchoolYear";
            let viewState = encodeURIComponent(doc.getElementById('__VIEWSTATE').attributes[3].nodeValue);
            let eventValidation = encodeURIComponent(doc.getElementById('__EVENTVALIDATION').attributes[3].nodeValue);
            let yr = new Date().getFullYear();
            let month = new Date().getMonth();
            let placeHolder = year == 0 ? (month<9 ? yr-1 : yr) : year;
            console.log('placeHolder:' + placeHolder);
            return fetch('http://web.ablmcc.edu.hk/Content/07_parents/notice/index.aspx', {
              method: "POST",
              headers: {"Content-Type": "application/x-www-form-urlencoded"},
              body: "__EVENTTARGET="+target+"&__VIEWSTATE="+viewState+"&__EVENTVALIDATION="+eventValidation+"&__SCROLLPOSITIONX=0&__SCROLLPOSITIONY=0"+
              "&ctl00%24ContentPlaceHolder1%24ddlstSchoolYear="+placeHolder
            });
          })
          .then((r) => r.text()).then((rt) => {
            let doc = new DomParser().parseFromString(rt);
            callback(doc);
          })
          .catch((err) => console.error(err));
}

function getABLMCCHW(className, callback) {
  return fetch('http://web.ablmcc.edu.hk/Content/07_parents/homework/index.aspx')
        .then((r) => r.text()).then((rt) => {
          let doc = new DomParser().parseFromString(rt);
          let target = "ctl00%24ContentPlaceHolder1%24"+(232+classNameConvert(className));
          let viewState = encodeURIComponent(doc.getElementById('__VIEWSTATE').attributes[3].nodeValue);
          let eventValidation = encodeURIComponent(doc.getElementById('__EVENTVALIDATION').attributes[3].nodeValue);
          return fetch('http://web.ablmcc.edu.hk/Content/07_parents/homework/index.aspx', {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: "__EVENTTARGET="+target+"&__VIEWSTATE="+viewState+"&__EVENTVALIDATION="+eventValidation+"&__SCROLLPOSITIONX=0&__SCROLLPOSITIONY=0"
          });
        })
        .then((r) => r.text()).then((rt) => {
          let doc = new DomParser().parseFromString(rt);
          callback(doc);
          return doc;
        })
        .catch((err) => console.error(err));
}

export default class ABLMCCInterface {
  constructor() {
    this.ablmcc = new Map([['NormalNews', undefined],['Notices', undefined],['Activities', undefined],['Career', undefined],['Assignments', undefined]]);
    this.requested = new Map([['NormalNews', false],['Notices', 10],['Activities', false],['Career', false],['Assignments', false]]);
  }

  checkAvailability(callback) {
    checkAvailability().then(state => callback(state));
  }

  getNormalNews(callback) {
    if(this.ablmcc.get('NormalNews')===undefined) {
      this.requested.set('NormalNews', true);
      getABLMCC('http://web.ablmcc.edu.hk/Content/08_others/01_what_is_new/index.aspx', (d) => {
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

  getNotices(callback, lower, upper, year) {
    if(this.ablmcc.get('Notices')===undefined || this.requested.get('Notices')<upper) {
      this.requested.set('Notices', true);
      getABLMCCNotices(year, (d) => {
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

  //No checking***
  getHomework(className, callback) {
    console.log('call');
    callback( {'today': [
      {'subject': "Chinese", 'summary': "Testing 1111", 'date': "01-09-2017"}
    ], 'next': [
      {'subject': "Chinese", 'summary': "Testing 1111", 'date': "01-09-2017"}
    ], 'nextnext': [
      {'subject': "Chinese", 'summary': "Testing 1111", 'date': "01-09-2017"}
    ]} );
    getABLMCCHW(className, d => {
        let table = d.getElementByClassName('homeworkIssue') != null ? d.getElementByClassName('homeworkIssue').childNodes : null;
        let dueTable = d.getElementByClassName('twoDueHomeworkTable').childNodes[1].childNodes;
        var json = {'today': [], 'next': [], 'nextnext': []};
        //homeworkIssue finding
        json.today = table != null ? HWBuilder(table) : [];
        //duetoHomework finding
        let left = dueTable[1], right = dueTable[3];
        if(left.childNodes.length > 1) {
          let title = left.childNodes[1].firstChild.nodeValue;
          let table = left.childNodes[3].childNodes;
          json.next = HWBuilder(table);
          json.next.unshift(title);
        }
        if(right.childNodes.length > 1) {
          let title = right.childNodes[1].firstChild.nodeValue;
          let table = right.childNodes[3].childNodes;
          json.nextnext = HWBuilder(table);
          json.nextnext.unshift(title);
        }
        console.log(json);
        this.ablmcc.set('Notices', json);
        callback(json);
      }
    );
  }
}
