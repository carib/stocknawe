import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import _ from 'lodash';

import { WatchListings } from './watch_listings';
import { SearchBar } from '../search/search_bar';

import * as SVG from '../util/svg_util';

import './watch_list.css';

class WatchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watchedItems: {},
      searchQuery: '',
      queryData: {},
      availableStocks: {},
      initialized: false,
      viewIndex: 0,
      listOpen: true,
    }
    this.toggleList = this.toggleList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.rotateView = this.rotateView.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { watchedItems } = nextProps;
    if (this.state.watchedItems !== watchedItems) {
      this.setState((state, props) => {
        return {
          ...state,
          watchedItems,
          initialized: true
        }
      })
    }
  }

  handleClick(e) {
    if (e) {
      e.preventDefault();
    }
    if (this.state.searchQuery) {
      const symb = [this.state.searchQuery];
      this.props.fetchStocksData(symb)
    }
  }

  rotateView() {
    const { viewIndex } = this.state;
    const maxIndex = 2;
    let newIndex = (viewIndex === maxIndex) ? 0 : viewIndex + 1;
    this.setState({
      viewIndex: newIndex
    });
  }

  handleChange(e) {
    this.setState({
      searchQuery: e.target.value
    });
  }

  toggleList() {
    console.log('CLICK!');
    this.setState({
      listOpen: !this.state.listOpen
    })
  }

  handleSelection(stock) {
    this.props.setSelected(stock);
  }

  redirectHome() {

  }

  render() {
    const {
      initialized,
      searchQuery,
      watchedItems,
      viewIndex,
      listOpen
    } = this.state;
    if (initialized) {
      let listGridRow = _.size(watchedItems) + 2;
      const listStyle = {
        gridRow: `3 / span ${listGridRow}`
      }
      const controlsStyle = {
        gridRow: `${listGridRow + 3} / span ${28 - listGridRow}`
      }
      return (
        <div className="sidebar-wrap">
          <header className="App-header">
            <Link to='/'>
              <div className='home-link'>HOME</div>
            </Link>
          </header>
          <div className="sidebar">
            <div className={listOpen ? 'watch-list' : 'watch-list closed'}>
              <div className="watch-list__toggle" onClick={this.toggleList}>{'<'}</div>
              <div className="watch-list__search">
                <SearchBar
                  value={searchQuery}
                  onClick={this.handleClick}
                  onChange={this.handleChange}
                  />
              </div>

              <WatchListings
                style={listStyle}
                items={Object.entries(watchedItems)}
                rotateView={this.rotateView}
                viewIndex={viewIndex}
                setSelected={this.handleSelection}
                />

              <div className="watch-list__controls" style={controlsStyle}>
                <div className="button-wrap">
                  <button className="button__watch-list more" onClick={this.handleClick}>
                    <SVG.moreButton />
                  </button>
                  <button className="button__watch-list less" onClick={this.handleClick}>
                    <SVG.lessButton />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return <h1>Loading...</h1>
    }
  }
}

export default WatchList;
