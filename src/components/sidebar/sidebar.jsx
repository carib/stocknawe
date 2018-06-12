import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import _ from 'lodash';

import { AppContext } from '../../context_api';
import WatchList from './watch_list/watch_list';
import { SearchListings } from './search/search_listings';
import { SearchBar } from './search/search_bar';
import './sidebar.css';

import * as SVG from '../util/svg_util';


const SideBar = () => {
  const handleClick = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (/more/.test(e.currentTarget.classList)) {
      this.setState({
        searchOpen: true
      });
    }
  }



  const showSearchResults = ({ searchOpen, newResults }) => {
    if (searchOpen && newResults) {
      return (
        <AppContext.Consumer>
          {({state, actions}) => {
            let items = _.entries(state.filteredStocks);
            return (

              <div className="search-results">
                <SearchListings items={items}/>
              </div>
            )
          }}
        </AppContext.Consumer>
      )
    }
  }

  const showSearchBar = (state, actions) => {
    if (state.searchOpen) {
      return <SearchBar
        value={state.searchQuery}
        onChange={actions.handleChange}/>
    } else {
      return <div className="not-search"></div>
    }
  }

  return (
    <AppContext.Consumer>
      {({state, actions}) => {
        let listGridRow = _.size(state.watchedItems);
        const controlsStyle = {
          gridRow: `${listGridRow + 16} / span ${28 - listGridRow}`
        }
        return (
          <div className="sidebar">
            <header className="sidebar-header">
              <Link to='/' onClick={actions.removeSelected}>
                <div className='home-link'>
                  <div className="app-name-1">STOCK</div>
                  <div className="app-name-2">- n -</div>
                  <div className="app-name-3">AWE</div>
                </div>
              </Link>
            </header>
            <div className='watch-list'>
              <WatchList />
            </div>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}
// <div className="watch-list__controls" style={controlsStyle}>
//   <div className="button-wrap">
//     <button className="button__watch-list more" onClick={actions.handleClick}>
//       <SVG.moreButton />
//     </button>
//     <button className="button__watch-list less" onClick={this.handleClick}>
//       <SVG.lessButton />
//     </button>
//   </div>
// </div>
// <div className="watch-list__search">
//   {showSearchBar(state, actions)}
//   {showSearchResults(state)}
// </div>


export default SideBar;
