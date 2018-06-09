import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import _ from 'lodash';

import * as Mock from './components/mock_values/mock_user_values';
import WatchList from './components/watch_list/watch_list_dash';
import StockView from './components/stock_view/stock_view_dash';
import Dashboard from './components/dash_home/dash';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStock: null,
      watchList: {},
      availableStocks: {},
    }

    this.setSelected = this.setSelected.bind(this);
    this.updateWatchList = this.updateWatchList.bind(this);
    this.fetchAvailable = this.fetchAvailable.bind(this);
    this.fetchStocksData = this.fetchStocksData.bind(this);
  }

  componentDidMount() {
    let symbols = Mock.watchList;
    this.fetchStocksData(symbols);
    this.fetchAvailable();
  }

  fetchAvailable() {
    const stocksURL = `https://api.iextrading.com/1.0/ref-data/symbols`;
    fetch(stocksURL)
      .then(response => response.json())
      .then(json => {
        this.setState({ availableStocks: json })
      });
  }

  fetchStocksData(symbols) {
    symbols = symbols.length > 1 ? symbols.join(',') : symbols[0];
    const url = `https://api.iextrading.com/1.0/stock/market/batch?` +
                `symbols=${symbols}` +
                `&types=quote,news,chart` +
                `&range=1m` +
                `&last=5`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({ watchList: json })
      });
  }

  updateWatchList(stocks) {
    let watchList = _.merge({}, stocks, this.state.watchList);
    this.setState((state, props) => {
      return {
        ...state,
        watchList
      }
    })
  }

  setSelected(stock) {
    stock = _.merge({}, stock[1]);
    this.setState((state, props) => {
      return {
        ...state,
        selectedStock: stock,
      }
    })
  }

  render() {
    const { watchList } = this.state;
    return (
      <Router>
        <main className="App">
          <header className="App-header">
            <Link to='/'>
              <div className='home-link'>HOME</div>
            </Link>
          </header>
          <div className="sidebar">
            <WatchList watchedItems={watchList}
              setSelected={this.setSelected}
              updateWatchList={this.updateWatchList}/>
          </div>
          <Route path="/stocks/:symbol"
            render={(props) => <StockView {...props} selectedStock={this.state.selectedStock}/>} />
          <Route exact path='/'
            render={(props) => <Dashboard {...props}
            watchList={watchList} fetchAvailable={this.fetchAvailable}
          fetchStocksData={this.fetchStocksData}/> }/>
        </main>
      </Router>
    );
  }
}

export default App;
