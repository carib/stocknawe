import React from 'react';
import { withRouter } from 'react-router-dom';

import _ from 'lodash';

import { DashCarousel } from './dash_carousel';

import './dash.css'

const getGreeting = () => {
  let hour = new Date().getHours();
  let period;
  if (hour < 12) {
    period = 'morning'
  } else if (_.inRange(hour, 12, 17)) {
    period = 'afternoon'
  } else if (_.inRange(hour, 17, 22)) {
    period = 'evening'
  } else {
    period = 'night'
  }
  let greeting = `Good ${period}! :)`
  return <div className="greeting-text">{greeting}</div>
}

const Dashboard = () => (
  <div className="dash">
    <div className="dash__greeting">{getGreeting()}</div>
    <DashCarousel />
  </div>
)

export default Dashboard;
