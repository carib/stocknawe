import React, { Component } from 'react';
// import {
//   BrowserRouter,
//   Route,
//   Link
// } from 'react-router-dom';

import WatchList from './components/watch_list/watch_list_dash';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <WatchList />
      </div>
    );
  }
}

export default App;
