import React, { Component } from 'react';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import _ from 'lodash';

import { AppContext } from './context_api';
import { Dashboard } from './components/dash_home/dash';
import SideBar from './components/sidebar/sidebar';
import StockView from './components/stock_view/stock_view_dash';
import * as Mock from './components/mock_values/mock_user_values';

import './App.css';

class App extends Component {

  state = {
    selectedStock: {},
    watchList: {},
    viewIndex: 0,
    searchOpen: false,
  }

  componentDidMount = () => {
    this.fetchStocksData();
    document.addEventListener('keypress', (e) => {
      if (!this.state.searchOpen) {
        this.toggleSearchBar();
      }
    })
  }

  updateWatchList = (stock) => {
    stock = { symbols: [stock] };
    this.fetchStocksData(stock);
    this.toggleSearchBar();
  }

  toggleRemovalAlert = () => {
    const list = document.getElementsByClassName('list')[0]
    _.map(list.children, (item) => {
      if (item.firstChild.classList.contains('selected')) {
        item.firstChild.classList.remove('selected')
      }
      if (item.firstChild.classList.contains('removal-alert')) {
        item.firstChild.classList.remove('removal-alert')
      } else {
        item.firstChild.classList.add('removal-alert')
      }
    })
  }

  removeStockFromList = (stock) => {
    let newList = _.merge({}, this.state.watchList)
    if (_.keys(this.state.watchList).includes(stock)) {
      delete newList[stock]
      this.setState({
        watchList: newList
      })
      this.toggleRemovalAlert()
    }
  }

  fetchStocksData = (options) => {
    const defaults = {
      symbols: Mock.watchList, // Array
      types: ['quote', 'news', 'chart'],
      range: ['1m'],
      last: 5
    }
    options = _.merge({}, defaults, options)
    const { symbols, types, range, last } = options
    const url = `https://api.iextrading.com/1.0/stock/market/batch?` +
                `symbols=${_.size(symbols) > 1 ? symbols.join('%2C') : symbols[0]}` +
                `&types=${_.size(types) > 1 ? types.join('%2C') : types[0]}` +
                `&range=${range}` +
                `&last=${last}`;
    fetch(url)
      .then(response => response.json())
      .then(watchList => {
        this.setState((state, props) => {
           watchList = _.merge({}, this.state.watchList, watchList)
           return {
             ...state,
             watchList,
           }
        })
      })
      .catch(error => console.log(error))
  }

  rotateView = () => {
    const { viewIndex } = this.state
    const maxIndex = 2
    let newIndex = (viewIndex === maxIndex) ? 0 : viewIndex + 1
    this.setState({ viewIndex: newIndex })
  }

  toggleSearchBar = (e) => {
    if (e) e.preventDefault();
    this.setState({ searchOpen: !this.state.searchOpen })
  }

  removeSelected = (e) => {
    let selected = document.getElementsByClassName('selected');
    _.each(selected, (node) => node.classList.remove('selected'))
  }

  setSelected = (e) => {
    let symbol = e.currentTarget.dataset.stock
    let selected = document.getElementsByClassName('selected')[0];
    let nextSelected = Array.from(document.getElementsByName(symbol));
    _.each(nextSelected, (node) => node.classList.add('selected'));
    if (e.currentTarget.classList.contains('removal-alert')) {
      this.removeStockFromList(symbol)
    } else {
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
              toggleSearchBar: event => this.toggleSearchBar(event),
              removeSelected: event => this.removeSelected(event),
              fetchStocksData: event => this.fetchStocksData(event),
              updateWatchList: event => this.updateWatchList(event),
              toggleRemovalAlert: event => this.toggleRemovalAlert(event),
            }
          }}>

        <SideBar />
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route path='/stocknawe' component={Dashboard}/>
          <Route path="/stocks/:symbol" component={StockView}/>
        </Switch>
      </AppContext.Provider>
    </main>
    )
  }
}

export default withRouter(App);
