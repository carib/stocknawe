import React, { Component } from 'react';

import axios from 'axios';
import _ from 'lodash';

import { List } from './list';
import { SearchBar } from '../search/search_bar';

import * as Mock from '../mock_values/mock_user_values';

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
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.rotateView = this.rotateView.bind(this);
  }

  componentWillMount() {
    this.initList()
  }

  initList() {
    let watchedItems = _.assign({}, Mock.watchList); // NB: This would be user's saved list.
    this.fetchStocksData(Object.keys(watchedItems))
      .then(res => {
        let watchedItems = res.data;
        console.log(watchedItems);
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
        this.setState(availableStocks);
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
    console.log(this.state.searchQuery);
  }

  render() {
    const {
      initialized,
      searchQuery,
      watchedItems,
      viewIndex
    } = this.state;

    if (initialized) {
      return (
        <div className="watch-list">

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
          />

        <div className="watch-list__controls">
            <button className="button">Add</button>
            <button className="button">Nix</button>
          </div>
        </div>
      )
    } else {
      return <h1>Loading...</h1>
    }
  }
}

export default WatchList;
