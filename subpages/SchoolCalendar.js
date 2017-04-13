'use strict'
import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Navigator,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import Calendar from 'react-native-calendar';
import ABLMCCWrapper from '../ABLMCCWrapper';
var DomParser = require('react-native-html-parser').DOMParser;
import styles from '../styles.js';

export default class SchoolCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format(),
    };
  }



  render() {©
    const CStyle = {
      calendarContainer: {
        backgroundColor: 'transparent',
      },
      day: {
        fontSize: 15,
        textAlign: 'center'
      },
    };
    return (
      <ABLMCCWrapper render={(
        <Calendar
          currentMonth={this.state.date}
          customStyle={CStyle} // Customize any pre-defined styles
          eventDates={['2017-04-13']}       // Optional array of moment() parseable dates that will show an event indicator
          events={[{date:'2017-04-12'}]}// Optional array of event objects with a date property and custom styles for the event indicator
          onDateSelect={(date) => this.setState({ date: date })}
          onTouchNext={() => this.onTouchNext()}
          onTouchPrev={() => this.onTouchPrev()}
          prevButtonText={'Prev'}
          nextButtonText={'Next'}
          scrollEnabled={false}
          currentMonth={this.state.date}
          showControls={true}
          showEventIndicators={true}
          titleFormat={'MMMM YYYY'}
          weekStart={0}
        />
      )} />
    );
  }
}
