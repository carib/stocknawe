import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import _ from 'lodash';

import { WatchListings } from './watch_listings';

// import * as SVG from '../util/svg_util';
import './watch_list.css';

class WatchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watchedItems: {},
      availableStocks: [],
      initialized: false,
      viewIndex: 0,
    }

    this.rotateView = this.rotateView.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { availableStocks, watchedItems } = nextProps;
    if (this.state.watchedItems !== watchedItems ||
        this.state.availableStocks !== availableStocks) {
      this.setState((state, props) => {
        return {
          ...state,
          watchedItems,
          availableStocks,
          initialized: true,
        }
      })
    }
  }

  rotateView() {
    const { viewIndex } = this.state;
    const maxIndex = 2;
    let newIndex = (viewIndex === maxIndex) ? 0 : viewIndex + 1;
    this.setState({
      viewIndex: newIndex
    });
  }

  handleSelection(stock) {
    this.props.setSelected(stock);
  }

  render() {
    const {
      watchedItems,
      viewIndex
    } = this.state;
    let listGridRow = _.size(watchedItems) + 2;
    const listStyle = {
      gridRow: `1 / span ${listGridRow}`
    }

    return (

      <div className="sidebar">
        <header className="sidebar-header">
          <Link to='/' onClick={this.props.goHome}>
            <div className='home-link'>
              <div className="app-name-1">STOCK</div>
              <div className="app-name-2">- n -</div>
              <div className="app-name-3">AWE</div>
            </div>
          </Link>
        </header>
        <div className={'watch-list'}>
          <WatchListings
            style={listStyle}
            items={Object.entries(watchedItems)}
            rotateView={this.rotateView}
            viewIndex={viewIndex}
            setSelected={this.handleSelection}/>
        </div>
      </div>
    )
  }
}

export default withRouter(WatchList);
