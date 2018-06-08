import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import _ from 'lodash';

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
    }

    this.setSelected = this.setSelected.bind(this);
    this.updateWatchList = this.updateWatchList.bind(this);
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
            watchList={watchList} /> }/>
        </main>
      </Router>
    );
  }
}

export default App;
