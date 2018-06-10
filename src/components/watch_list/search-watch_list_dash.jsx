import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import _ from 'lodash';

import { WatchListings } from './watch_listings';
import { SearchListings } from '../search/search_listings';
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
      availableStocks: [],
      filteredStocks: [],
      initialized: false,
      viewIndex: 0,
      listOpen: true,
      searchOpen: false,
      searchResults: {},
      newResults: false
    }
    this.toggleList = this.toggleList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.rotateView = this.rotateView.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { availableStocks, watchedItems, searchResults } = nextProps;
    if (this.state.searchResults !== searchResults) {
      this.setState({ newResults: true, searchResults })
    }
    if (this.state.watchedItems !== watchedItems ||
        this.state.availableStocks !== availableStocks) {
      this.setState((state, props) => {
        return {
          ...state,
          watchedItems,
          availableStocks,
          initialized: true,
          searchResults
        }
      })
    }
  }

  handleClick(e) {
    if (e) {
      e.preventDefault();
    }
    if (/more/.test(e.currentTarget.classList)) {
      this.setState({
        searchOpen: true
      });
    }
    // if (this.state.searchQuery) {
    //   const symb = [this.state.searchQuery];
    //   this.props.fetchStocksData(symb)
    // }
  }

  handleChange(e) {
    e.preventDefault()
    const { availableStocks } = this.state;
    let searchQuery = e.target.value
    let query = new RegExp('^' + searchQuery, 'i');
    let filteredStocks = _.filter(availableStocks, (stock) => {
      return query.test(stock.name) || query.test(stock.symbol)
    })
    filteredStocks = _.sortBy(filteredStocks)
    this.setState((state, props) => {
      let symbols = filteredStocks.slice(0, 10).map(stock => stock.symbol)
      let isSearch = true;
      this.props.fetchStocksData(symbols, isSearch);
      return {
        ...state,
        searchQuery,
        filteredStocks,
        newResults: false
      }
    });
  }

  showSearchResults() {
    const { filteredStocks } = this.state;
    const isSearch = true;
    const {
      newResults,
      searchResults,
      viewIndex,
      listOpen
    } = this.state;
    if (newResults) {
      let listGridRow = _.size(searchResults) + 2;
      const listStyle = {
        gridRow: `3 / span ${listGridRow}`
      }
      const controlsStyle = {
        gridRow: `${listGridRow + 3} / span ${28 - listGridRow}`
      }
      return (
        <div className="search-results">
          <SearchListings
            style={listStyle}
            items={Object.entries(searchResults)}
            rotateView={this.rotateView}
            viewIndex={viewIndex}
            setSelected={this.handleSelection}/>
        </div>
      )
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

  toggleList() {
    console.log('CLICK!');
    this.setState({
      listOpen: !this.state.listOpen
    })
  }

  handleSelection(stock) {
    this.props.setSelected(stock);
  }

  showSearchBar() {
    if (this.state.searchOpen) {
      return <SearchBar
        value={this.state.searchQuery}
        onClick={this.handleClick}
        onChange={this.handleChange}/>
    } else {
      return <div className="not-search"></div>
    }
  }

  render() {
    const {
      initialized,
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

        <div className="sidebar">
          <header className="sidebar-header">
            <Link to='/'>
              <div className='home-link'>
                <div className="app-name-1">STOCK</div>
                <div className="app-name-2">- n -</div>
                <div className="app-name-3">AWE</div>
              </div>
            </Link>
          </header>
          <div className={listOpen ? 'watch-list' : 'watch-list closed'}>
            <div className="watch-list__search">
              {this.showSearchBar()}
              {this.showSearchResults()}
            </div>

            <WatchListings
              style={listStyle}
              items={Object.entries(watchedItems)}
              rotateView={this.rotateView}
              viewIndex={viewIndex}
              setSelected={this.handleSelection}/>

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
      )
    } else {
      return <h1>Loading...</h1>
    }
  }
}

export default WatchList;
