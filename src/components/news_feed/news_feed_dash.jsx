import React, { Component } from 'react';

import _ from 'lodash';
import axios from 'axios';

import { FeedList } from './news_feed_list';
import './news_feed.css';

class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      articles: [],
      isActive: false,
    }
  }

  componentWillMount() {
    const key = 'ff929253a79a40478359573471e7a68e';
    const url = `https://newsapi.org/v2/everything?q=Microsoft,MSFT&language=en&from=2018-06-05&sortBy=relevancy&apikey=${key}`;
    axios.get(url)
      .then(res => {
        console.log(res.data);
        let feed = _.uniqBy(res.data['articles'], 'title');
        console.log(feed);
        this.setState({ articles: feed });
      })
      .catch(error => console.log(error))
  }

  render() {
    return <FeedList articles={this.state.articles} />
  }
}

export default NewsFeed;
