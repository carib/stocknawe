import React, { Component } from 'react';

import { List } from './list';
import './watch_list.css';

class WatchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watchedItems: {

      }
    }
  }

  render() {
    return (
      <div className="watch-list">
        <List items={this.state.watchedItems} />
        <div className="watch-list__controls"></div>
      </div>
    )
  }
}

export default WatchList;
