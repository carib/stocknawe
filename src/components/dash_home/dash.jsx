import React from 'react';

import { DashWidget } from './dash_widget';

import * as SVG from '../../svg_util';
import './dash.css'

export const Dashboard = (props) => {
  return (
    <div className="mock__dash">
      <div className="mock__greeting">DASHBOARD GREETING</div>
      <div className="mock__carousel">
        <div className="mock__arrow-left"><SVG.leftArrow/></div>
        <DashWidget/>
        <DashWidget/>
        <DashWidget/>
        <DashWidget/>
        <DashWidget/>
        <div className="mock__arrow-right"><SVG.rightArrow/></div>
      </div>
      <div className="mock__ticker">TICKER</div>
    </div>
  )
}

/*
// TODO:
- Market closed?
- Ticker
- Match widget to list hover & selected
- Animate widget expand into stock detail view transition
- Mini-charts for widgets
- Day range (low -> high)
- 52-week range
- Headlines?

*/
