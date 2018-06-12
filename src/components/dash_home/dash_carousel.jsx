import React from 'react';

import { DashWidget } from './dash_widget';

import {AppContext} from '../../context_api';

export const DashCarousel = () => {
  return (
    <AppContext.Consumer>
      {({ state, actions }) => {
        let items = Object.entries(state.watchList);
        return (
          <div className="dash__carousel">
            {
              items.map((item, index) => <DashWidget
                                          key={index}
                                          item={item}
                                          setSelected={actions.setSelected}
                                          />)
            }
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}
