import React, { Component, createContext } from 'react';

export const AppContext = createContext({
  selectedStock: null,
  watchList: {},
  searchResults: {},
  availableStocks: []
});

export class AppProvider extends Component {
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

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export const DashContext = createContext({
  widgets: [],
  viewIndex: 0,
});
