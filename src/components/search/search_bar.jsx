import React from 'react';

import * as SVG from '../../svg_util';

import './search.css';

export const SearchBar = (props) => {
  return (
    <div className='search-bar'>
      <form className='search-bar__form'>
        <div className="search-bar__icon">
          <SVG.SearchIcon />
        </div>
        <input className='search-bar__input'
          value={ props.value }
          onChange={ props.onChange } />
        <button className='button' onClick={ props.onClick }>Search</button>
      </form>
    </div>
  )
}
