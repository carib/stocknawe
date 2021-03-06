import React from 'react';

import _ from 'lodash';

import { SearchContext } from '../../../context_api';
import { SearchResults } from './search_results';
import * as SVG from '../../util/svg_util';

import './search.css';

class SearchBar extends React.Component {
  state = {
    searchResults: {},
    searchQuery: '',
    queryData: {},
    newResults: false,
    availableStocks: [],
    filteredStocks: [],
    viewIndex: 0
  }

  componentDidMount = () => {
    this.fetchAvailable();
    const searchBarInput = document.getElementsByClassName('search-bar__input')[0]
    searchBarInput.addEventListener('keydown', (e) => {
      const results = document.getElementsByClassName('search-list')[0]
      const selected = document.getElementsByClassName('selected')[0]
      if ([38, 40].includes(e.keyCode) && results) {
        let nextSelected
        if (e.keyCode === 38) {
          if (selected) {
            nextSelected = selected.previousElementSibling || results.lastChild
            selected.classList.remove('selected')
          } else {
            nextSelected = results.lastChild
          }
        }
        if (e.keyCode === 40) {
          if (selected) {
            nextSelected = selected.nextElementSibling || results.firstChild
            selected.classList.remove('selected')
          } else {
            nextSelected = results.firstChild
          }
        }
        nextSelected.classList.add('selected')
      }
    })
  }

  fetchAvailable = () => {
    this.setState({ searchResults: {} })
    const stocksURL = `https://api.iextrading.com/1.0/ref-data/symbols`;
    fetch(stocksURL)
      .then(response => response.json())
      .then(availableStocks => {
        this.setState({ availableStocks })
      })
      .catch(error => console.log(error))
  }

  fetchQueryStocks = (symbols) => {
    const url = `https://api.iextrading.com/1.0/stock/market/batch?` +
                `filter=symbol,companyName,marketCap,changePercent,change,latestPrice` +
                `&symbols=${_.size(symbols) > 1 ? symbols.join('%2C') : symbols[0]}` +
                `&types=quote`
    fetch(url)
      .then(response => response.json())
      .then(searchResults => {
        this.setState({
          searchResults,
          newResults: true
         })
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
    this.fetchQueryStocks(symbols);
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
    this.setState({ viewIndex: newIndex });
  }

  showSearchResults = () => {
    if (this.state.newResults && this.state.searchQuery) {
      return (
        <div className="search-results">
          <SearchResults />
        </div>
      )
    }
  }

  addToWatchList = (e) => {
    e.preventDefault()
    const stock = e.currentTarget.dataset.symbol
    this.props.updateWatchList(stock)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const results = document.getElementsByClassName('search-list')[0]
    if (results) {
      const selected = _.find(results.children, (result) => result.classList.contains('selected'))
      if (selected) {
        this.props.updateWatchList(selected.dataset.symbol)
      }
    }
    this.props.toggleSearchBar()
  }

  render() {
    return (
      <SearchContext.Provider value={
          {
            state: this.state,
            actions: {
              fetchQueryStocks: event => this.fetchQueryStocks(event),
              addToWatchList: event => this.addToWatchList(event),
              rotateView: event => this.rotateView(event),
            }
          }}>

        <div className='search-bar'>
          <form className='search-bar__form' onSubmit={this.handleSubmit}>
            <div className="search-bar__icon">
              <SVG.SearchIcon />
            </div>
            <input
              className='search-bar__input'
              value={ this.state.value }
              onChange={ this.handleChange }
              autoFocus={true}/>
            <button className='button__search' onClick={ this.handleClick }>Search</button>
          </form>

          { this.showSearchResults() }

        </div>
      </SearchContext.Provider>
    )
  }
}

export default SearchBar;
