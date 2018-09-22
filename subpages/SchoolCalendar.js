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
import { Calendar } from 'react-native-calendars';
import ABLMCCWrapper from '../ABLMCCWrapper';
var DomParser = require('react-native-html-parser').DOMParser;
import styles from '../styles.js';
const colorHoliday = '#69F0AE';
const colorExam = '#64B5F6';

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
  let r = {}, i=0;
  data.forEach(inner => {
    inner.date.forEach(iinner => {
      let hasColor = color(getFromKey(iinner, data));
      if(hasColor.colorExam === undefined && hasColor.colorHoliday === undefined) return;

      r[iinner] = {
        periods: []
      };
      if(hasColor.colorExam !== undefined) r[iinner].periods.push({'startingDay': hasColor.colorExam.startingDay,'endingDay': hasColor.colorExam.endingDay,'color': colorExam});
      if(hasColor.colorHoliday !== undefined) r[iinner].periods.push({'startingDay': hasColor.colorHoliday.startingDay,'endingDay': hasColor.colorHoliday.endingDay,'color': colorHoliday});
      i++;
    })
  });
  //...color(getFromKey(iinner, data)),
  return r;
}

function isExam(e) {
  return (e.includes('試') && !e.includes('試後')) || e.includes('測驗');
}

function isHoliday(e) {
  return e.includes('假') || e.includes('節');
}

function datesNotContinuous(d1: String, d2: String) {
  return !Math.abs(Date.parse(d1)-Date.parse(d2)) == 1;
}

function previousDay(event: Array, i) {
  if(i<=0) return '';
  if(datesNotContinuous(event[i], event[i-1])) return '';
  return event[i-1];
}

function nextDay(event: Array, i) {
  if(i>=event.length) return '';
  if(datesNotContinuous(event[i], event[i+1])) return '';
  return event[i+1];
}

function color(event: Array) {
  let hasColor = {};
  event.forEach((e, i) => {
    if(isExam(e)) hasColor.colorExam = {startingDay: false, endingDay: false};
    if(isHoliday(e)) hasColor.colorHoliday = {startingDay: false, endingDay: false};

    if(i == 0) {
      if(isExam(e)) hasColor.colorExam.startingDay = true;
      if(isHoliday(e)) hasColor.colorHoliday.startingDay = true;
    }

    if(i == event.length - 1) {
      if(isExam(e)) hasColor.colorExam.endingDay = true;
      if(isHoliday(e)) hasColor.colorHoliday.endingDay = true;
    }

    if(isExam(e)) {
      if(!isExam(previousDay(event,i))) hasColor.colorExam.startingDay = true;
      if(!isExam(nextDay(event,i))) hasColor.colorExam.endingDay = true;
    }
    if(isHoliday(e)) {
      if(!isHoliday(previousDay(event,i))) hasColor.colorHoliday.startingDay = true;
      if(!isHoliday(nextDay(event,i))) hasColor.colorHoliday.endingDay = true;
    }

  });
  return hasColor;
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
    title: '校曆',
  };

  constructor(props) {
    super(props);
    this.state = {
      date: moment().format(),
      events: [],
      onlyDate: {},
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
    let onlyDate = JSON.parse(JSON.stringify(this.state.onlyDate));
    onlyDate[this.state.date].selected = false;
    onlyDate[date].selected = true;
    onlyDate[date].selectedColor = 'blue';
    this.setState({ date: date, onlyDate: onlyDate, eventText: getFromKey(date, this.state.events)});
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
            //currentMonth={this.state.date}
            current={this.state.date}
            //customStyle={CStyle}
            onDayPress={(date) => this.selectDate(date.dateString)}
            scrollEnabled={false}
            //showControls={true}
            //showEventIndicators={true}
            monthFormat={'MMMM yy'}
            weekStart={0}
            markedDates={this.state.onlyDate}
            markingType='multi-period'
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
