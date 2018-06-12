import { createContext } from 'react';

export const AppContext = createContext({
  selectedStock: null,
  watchList: {},
  searchResults: {},
  availableStocks: []
});
