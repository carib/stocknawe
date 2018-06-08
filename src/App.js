import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import _ from 'lodash';

import WatchList from './components/watch_list/watch_list_dash';
import StockView from './components/stock_view/stock_view_dash';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStock: null,
    }

    this.setSelected = this.setSelected.bind(this);
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
    return (
      <Router>
        <main className="App">
          <header className="App-header">
          </header>
          <div className="sidebar">
            <WatchList setSelected={this.setSelected}/>
          </div>
          <Route path="/stocks/:symbol"
            render={(props) => <StockView {...props} selectedStock={this.state.selectedStock}/>} />
        </main>
      </Router>
    );
  }
}

export default App;
