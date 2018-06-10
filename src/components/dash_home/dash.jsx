import React from 'react';
import { withRouter } from 'react-router-dom';

import _ from 'lodash';

import { DashCarousel } from './dash_carousel';

import './dash.css'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widgets: [],
      viewIndex: 0,
    }
    this.rotateView = this.rotateView.bind(this);
  }

  componentDidMount() {
    let widgets = Array.from(this.props.watchList);
    this.setState((state, props) => {
      return {
        ...state,
        widgets
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    let widgets = Object.entries(nextProps.watchList);
    if (widgets && widgets !== this.state.widgets) {
      this.setState((state, props) => {
        return {
          ...state,
          widgets
        }
      })
    }
  }

  rotateView() {
    const { viewIndex, widgets } = this.state;
    const maxIndex = widgets.length - 1;
    let newIndex = (viewIndex === maxIndex) ? 0 : viewIndex + 1;
    this.setState((state, props) => {
      return {
        ...state,
        viewIndex: newIndex
      }
    });
  }

  getGreeting() {
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

  render() {
    const { rotateView, viewIndex, widgets } = this.state;
    return (
      <div className="dash">
        <div className="dash__greeting">{this.getGreeting()}</div>
        <DashCarousel rotateView={rotateView} viewIndex={viewIndex} items={widgets} paths={this.props}/>
      </div>
    )
  }
}

export default withRouter(Dashboard);
