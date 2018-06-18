import React from 'react';
import { Link } from 'react-router-dom';


import _ from 'lodash';

import { AppContext } from '../../context_api';
import WatchList from './watch_list/watch_list';
import SearchBar from './search/search_bar';
import './sidebar.css';

import * as SVG from '../util/svg_util';

const SideBar = () => {
  const showSearchBar = (state, actions) => {
    if (state.searchOpen) {
      return <SearchBar updateWatchList={ actions.updateWatchList } toggleSearchBar={ actions.toggleSearchBar }/>
    } else {
      return <div className="not-search"></div>
    }
  }

  return (
    <AppContext.Consumer>
      {({state, actions}) => {
        const listSize = _.size(state.watchList)
        let listGridRow = listSize > 12 ? 12 : listSize;
        const controlsStyle = {
          gridRow: `${listGridRow + 11} / span ${28 - listGridRow}`
        }
        return (
          <div className="sidebar">
            <header className="sidebar-header">
                <div className='home-link'>
                  <Link to='/' onClick={actions.removeSelected}>
                  <div className="app-name-1">STOCK</div>
                  <div className="app-name-2">- n -</div>
                  <div className="app-name-3">AWE</div>
                </Link>
                </div>
            </header>
            <div className='watch-list'>
              <WatchList />
              <div className="watch-list__controls" style={controlsStyle}>
                <div className="button-wrap">
                  <button className="button__watch-list more" onClick={actions.toggleSearchBar}>
                    <SVG.moreButton />
                  </button>
                  <button className="button__watch-list less" onClick={actions.toggleRemovalAlert}>
                    <SVG.lessButton />
                  </button>
                </div>
              </div>
            </div>
            <div className="watch-list__search">

              { showSearchBar(state, actions) }

            </div>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}

export default SideBar;
