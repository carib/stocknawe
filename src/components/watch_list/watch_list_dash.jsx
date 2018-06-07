import React, { Component } from 'react';

import axios from 'axios';
import _ from 'lodash';

import { List } from './list';
import { SearchBar } from '../search/search_bar';

import * as Mock from '../mock_values/mock_user_values';
import * as SVG from '../../svg_util';

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

  componentWillMount() {
    this.initList()
  }

  initList() {
    let watchedItems = _.assign({}, Mock.watchList); // NB: Would be User's saved list.
    this.fetchStocksData(Object.keys(watchedItems))
      .then(res => {
        let watchedItems = res.data;
        this.setState((state, props) => {
          return {
            ...state,
            watchedItems,
            initialized: true,
          }
        })
      })
      .catch(error => console.log(error))
    this.fetchAvailable()
      .then(res => {
        let availableStocks = res.data;
        this.setState((state, props) => {
          return {
            ...state,
            availableStocks,
          }
        });

      })
      .catch(error => console.log(error))
  }

  async fetchAvailable() {
    const stocksURL = `https://api.iextrading.com/1.0/ref-data/symbols`;
    const res = await axios.get(stocksURL);
    return await res;
  }

  async fetchStocksData(symbols) {
    this.setState({
      searchQuery: '',
      queryData: {},
    });
    symbols = symbols.length > 1 ? symbols.join(',') : symbols[0];
    const url = `https://api.iextrading.com/1.0/stock/market/batch?` +
                `symbols=${symbols}` +
                `&types=quote,news,chart` +
                `&range=dynamic` +
                `&last=5`;
    const res = await axios.get(url);
    return await res;
  }

  handleClick(e) {
    if (e) {
      e.preventDefault();
    }
    if (this.state.searchQuery) {
      const symb = [this.state.searchQuery];
      this.fetchStocksData(symb)
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

  render() {
    const {
      initialized,
      searchQuery,
      watchedItems,
      viewIndex,
      listOpen
    } = this.state;

    if (initialized) {
      return (
        <div className={listOpen ? 'watch-list' : 'watch-list closed'}>
          <div className="watch-list__toggle" onClick={this.toggleList}>{'<'}</div>
          <div className="watch-list__search">
            <SearchBar
              value={searchQuery}
              onClick={this.handleClick}
              onChange={this.handleChange}
            />
          </div>

          <List
            items={Object.entries(watchedItems)}
            rotateView={this.rotateView}
            viewIndex={viewIndex}
            setSelected={this.handleSelection}
          />

          <div className="watch-list__controls">
            <div className="button-wrap">
              <button className="button__watch-list" onClick={this.handleClick}>
                <SVG.moreButton />
              </button>
              <button className="button__watch-list" onClick={this.handleClick}>
                <SVG.lessButton />
              </button>
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
