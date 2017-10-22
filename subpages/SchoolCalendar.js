'use strict'
import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Navigator,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import moment from 'moment';
import SCReader from '../SCReader';
import Calendar from 'react-native-calendar';
import ABLMCCWrapper from '../ABLMCCWrapper';
var DomParser = require('react-native-html-parser').DOMParser;
import styles from '../styles.js';

function assignYear(semYear, data) {
  return data.map(inner => {
    return {
      date: inner.date.map(p => {
              if(p.split('-')[0]<9) return (semYear+1)+'-'+p;
              else return semYear+'-'+p;
            }),
      event: inner.event,
    }
  });
}

function extractDate(data) {
  let r = [], i=0;
  data.forEach(inner => {
    inner.date.forEach(iinner => {
      r[i] = {
        date: iinner,
        ...color(getFromKey(iinner, data)),
      }
      i++;
    })
  });
  return r;
}

function color(event: Array) {
  let gonna = {
    eventIndicator: {backgroundColor: 'transparent'},
    hasEventCircle: {backgroundColor: 'transparent'},
    hasEventDaySelectedCircle: {backgroundColor: 'black'},
    hasEventText: {backgroundColor: 'transparent'},
  }, chosen = false;
  event.forEach(e => {
    if((e.includes('試') && !e.includes('試後')) || e.includes('測驗')) gonna.hasEventCircle.backgroundColor = '#64B5F6', chosen=true;
    if(e.includes('假') || e.includes('節')) gonna.hasEventText.backgroundColor = '#69F0AE', chosen=true;
    if(!chosen) gonna.eventIndicator.backgroundColor = '#000000';
  });
  return gonna;
}

function getFromKey(key, data) {
  let event = [];
  data.forEach(inner => {
    inner.date.forEach(iinner => {
      if(iinner == key) event.push(inner.event);
    });
  });
  if(event.length==0) event.push('當天無事項');
  return event;
}

export default class SchoolCalendar extends Component {
  static navigationOptions = {
    tabBarLabel: '校曆',
    title: '校曆',
  };

  constructor(props) {
    super(props);
    this.state = {
      date: moment().format(),
      events: [],
      onlyDate: [],
      eventText: [],
    };
    new SCReader().getEvents()
      .then(re => {
        let s = new Date();
        let sy = s.getMonth()<9 ? s.getFullYear()-1 : s.getFullYear();
        let get = assignYear(sy, re);
        this.setState({ events:  get,
                        onlyDate: extractDate(get),
                        eventText: getFromKey(this.state.date.split('T')[0], get)
                      });
      });
  }

  selectDate(date) {
    this.setState({ date: date, eventText: getFromKey(date.split('T')[0], this.state.events)});
  }

  render() {
    const CStyle = {
      calendarContainer: {
        backgroundColor: 'transparent',
      },
      weekendDayButton: {
        backgroundColor: 'transparent',
      },
      day: {
        fontSize: 15,
        textAlign: 'center'
      },
    };
    return (
      <ABLMCCWrapper>
        <View>
          <Calendar
            currentMonth={this.state.date}
            selectedDate={this.state.date}
            customStyle={CStyle}
            events={this.state.onlyDate}
            onDateSelect={(date) => this.selectDate(date)}
            prevButtonText={'Prev'}
            nextButtonText={'Next'}
            scrollEnabled={false}
            showControls={true}
            showEventIndicators={true}
            titleFormat={'MMMM YYYY'}
            weekStart={0}
          />
          <TouchableOpacity onPress={() => this.selectDate(moment().format())} style={{
            padding: 10,
            backgroundColor: 'transparent',
            alignItems: 'center',
            alignSelf: 'center',
            height: 10,
            width: 10
          }}>
            <Text>Today</Text>
          </TouchableOpacity>
          {this.state.eventText.map(p => <Text key={p} style={{padding: 10}}>{p}</Text>)}
        </View>
      </ABLMCCWrapper>
    );
  }
}
