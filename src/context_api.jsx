import { createContext } from 'react';

export const AppContext = createContext({
  selectedStock: null,
  watchList: {},
  viewIndex: 0,
  searchOpen: false,
});

export const SearchContext = createContext({
  searchOpen: false,
  searchResults: {},
  searchQuery: '',
  queryData: {},
  newResults: false,
  availableStocks: [],
  filteredStocks: [],
  viewIndex: 0
})
