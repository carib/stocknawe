import React, { Component } from 'react';
import {
  Link,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import _ from 'lodash';

import { AppContext } from './context_api';
import WatchList from './components/sidebar/watch_list/watch_list'
import { Dashboard } from './components/dash_home/dash';
import SideBar from './components/sidebar/sidebar';
import StockView from './components/stock_view/stock_view_dash';
import * as Mock from './components/mock_values/mock_user_values';
import { SearchListings } from './components/sidebar/search/search_listings';
import { SearchBar } from './components/sidebar/search/search_bar';


import './App.css';

class App extends Component {

  state = {
    selectedStock: {},
    watchList: {},
    searchResults: {},
    viewIndex: 0,
    searchQuery: '',
    queryData: {},
    availableStocks: [],
    filteredStocks: [],
    searchOpen: false,
    searchResults: {},
    newResults: false,
    availableStocks: [],
  }

  componentDidMount = () => {
    let symbols = Mock.watchList;
    this.fetchStocksData(symbols);
    this.fetchAvailable();
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
          this.setState({
            searchResults: stocks,
            newResults: true
          })
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

  handleChange = (e) => {
    e.preventDefault()
    const { availableStocks } = this.state;
    let searchQuery = e.target.value
    let query = new RegExp('^' + searchQuery, 'i');
    let filteredStocks = _.filter(availableStocks, (stock) => {
      return query.test(stock.name) || query.test(stock.symbol)
    })
    filteredStocks = _.sortBy(filteredStocks)
    let symbols = filteredStocks.slice(0, 10).map(stock => stock.symbol)
    let isSearch = true;
    this.fetchStocksData(symbols, isSearch);
    this.setState((state, props) => {
      return {
        ...state,
        searchQuery,
        filteredStocks,
        newResults: false
      }
    });
  }

  rotateView = () => {
    const { viewIndex } = this.state;
    const maxIndex = 2;
    let newIndex = (viewIndex === maxIndex) ? 0 : viewIndex + 1;
    this.setState({
      viewIndex: newIndex
    });
  }


  showSearchResults = () => (
    <div className="search-results">
      <SearchListings />
    </div>
  )

  showSearchBar = () => {
    if (this.state.searchOpen) {
      return <SearchBar
        value={this.state.searchQuery}
        onClick={this.handleClick}
        onChange={this.handleChange}/>
    } else {
      return <div className="not-search"></div>
    }
  }

  handleClick = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (/more/.test(e.currentTarget.classList)) {
      this.setState({
        searchOpen: true
      });
    }
  }

  removeSelected = (e) => {
    let selected = document.getElementsByClassName('selected');
    for (let i = 0; i < selected.length; i++) {
      selected[i].classList.remove('selected')
    }
  }

  setSelected = (e) => {
    let symbol = e.currentTarget.dataset.stock
    let selected = document.getElementsByClassName('selected')[0];
    let nextSelected = Array.from(document.getElementsByName(symbol));
    _.each(nextSelected, (node) => node.classList.add('selected'));
    if (selected) {
      selected.classList.remove('selected');
    }
    this.setState((state, props) => {
      return {
        ...state,
        selectedStock: this.state.watchList[symbol],
        onView: true,
      }
    })
  }

  render = () => {
    return (
    <main className="App">
      <AppContext.Provider value={
          {
            state: this.state,
            actions: {
              rotateView: event => this.rotateView(event),
              setSelected: event => this.setSelected(event),
              fetchAvailable: event => this.fetchAvailable(event),
              fetchStocksData: event => this.fetchStocksData(event),
              updateWatchList: event => this.updateWatchList(event),
              handleHomeButton: event => this.handleHomeButton(event),
              removeSelected: event => this.removeSelected(event),
              handleClick: event => this.handleClick(event),
              handleChange: event => this.handleChange(event),
            }
          }
        }>

        <SideBar />
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route path="/stocks/:symbol" component={StockView}/>
          </Switch>
        </AppContext.Provider>
      </main>
    )
  }
}

export default withRouter(App);
