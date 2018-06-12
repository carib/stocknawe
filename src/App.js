import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import _ from 'lodash';

import { AppContext } from './context_api';

import Dashboard from './components/dash_home/dash';
import WatchList from './components/watch_list/watch_list_dash';
import StockView from './components/stock_view/stock_view_dash';
import * as Mock from './components/mock_values/mock_user_values';


import './App.css';

class App extends Component {

  state = {
    selectedStock: null,
    watchList: {},
    searchResults: {},
    availableStocks: [],
    view: {
      stock: {},
      onView: false,
      viewOptions: {
        ranges: ["dynamic", "date", "1d", "1m", "3m", "6m", "ytd", "1y", "2y", "5y"],
        rangeIndex: 3,
      }
    },
    feed: {
      data: {},
      articles: [],
      symbol: '',
      isActive: false,
    }
  }

  componentDidMount = () => {
    let symbols = Mock.watchList;
    this.fetchStocksData(symbols);
    // this.fetchAvailable();
  }

  fetchStocksData = (symbols, isSearch = false) => {
    this.setState({
      searchResults: {}
    })
    symbols = symbols.length > 1 ? symbols.join(',') : symbols[0];
    const url = `https://api.iextrading.com/1.0/stock/market/batch?` +
                `symbols=${symbols}` +
                `&types=quote,news,chart` +
                `&range=1m` +
                `&last=5`;
    fetch(url)
      .then(response => response.json())
      .then(stocks => {
        if (isSearch) {
          this.setState({ searchResults: stocks })
        } else {
          this.setState({ watchList: stocks })
        }
      })
      .catch(error => console.log(error))
  }

  fetchAvailable = () => {
    const stocksURL = `https://api.iextrading.com/1.0/ref-data/symbols`;
    fetch(stocksURL)
      .then(response => response.json())
      .then(availableStocks => {
        this.setState({ availableStocks })
      })
      .catch(error => console.log(error))
  }

  updateWatchList = (stocks) => {
    let watchList = _.merge({}, stocks, this.state.list.watchList);
    this.setState((state, props) => {
      return {
        ...state,
        watchList
      }
    })
  }

  setSelected = (stock) => {
    stock = _.merge({}, stock[1]);
    let selected = document.getElementsByClassName('selected')[0];
    let nextSelected = Array.from(document.getElementsByName(stock.quote.symbol));
    _.each(nextSelected, (node) => node.classList.add('selected'));
    if (selected) {
      selected.classList.remove('selected');
    }
    this.setState((state, props) => {
      return {
        ...state,
        selectedStock: stock,
      }
    })
  }

  render = () => {
    const { watchList, availableStocks, searchResults, selectedStock } = this.state;
    return (
        <Router>
          <main className="App">
            <AppContext.Provider value={
                {
                  state: this.state,
                  actions: {
                    setSelected: event => this.setSelected(event),
                    fetchAvailable: event => this.fetchAvailable(event),
                    fetchStocksData: event => this.fetchStocksData(event),
                    updateWatchList: event => this.updateWatchList(event),
                  }
                }
              }>
              <WatchList
                fetchStocksData={this.fetchStocksData}
                availableStocks={availableStocks}
                watchedItems={watchList}
                searchResults={searchResults}
                setSelected={this.setSelected}
                updateWatchList={this.updateWatchList}/>
              <Switch>

                <Route exact path='/' render={(props) => (
                  <Dashboard {...props}
                    watchList={watchList}
                    fetchAvailable={this.fetchAvailable}
                    setSelected={this.setSelected}
                    fetchStocksData={this.fetchStocksData}/>
                )}/>
                <Route path="/stocks/:symbol"
                  render={(props) => (
                    <StockView {...props}
                      watchList={watchList}
                      selectedStock={selectedStock}
                      fetchStocksData={this.fetchStocksData}/>
                  )}/>
              </Switch>
            </AppContext.Provider>
          </main>
        </Router>
    );
  }
}

export default App;
