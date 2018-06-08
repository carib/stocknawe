import React from 'react';

import { DashCarousel } from './dash_carousel';

import * as SVG from '../../svg_util';
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

  render() {
    const { rotateView, viewIndex, widgets } = this.state;
    return (
      <div className="dash">
        <div className="dash__greeting">DASHBOARD GREETING</div>
        <div className="dash__carousel-wrap">
          <DashCarousel rotateView={rotateView} viewIndex={viewIndex} items={widgets} />
        </div>
        <div className="dash__ticker">TICKER</div>
      </div>
    )
  }
}

export default Dashboard;
// <div className="dash__arrow-left"><SVG.leftArrow/></div>
// <div className="dash__arrow-right"><SVG.rightArrow/></div>
