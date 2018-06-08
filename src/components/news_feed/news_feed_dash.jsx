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
      symbol: '',
      isActive: false,
    }
  }

  componentWillMount() {
    const { stock } = this.props
    console.log(stock);
    this.fetchNews(stock.quote, stock.chart[0].date)
    this.setState({
      symbol: stock.symbol
    })
  }

  componentWillReceiveProps(nextProps) {
    const { stock } = nextProps
    if (this.state.symbol !== stock.quote.symbol) {
      this.fetchNews(stock.quote, stock.chart[0].date);
      this.setState({
        symbol: stock.symbol
      })
    }
  }

  fetchNews(stock, date) {
    const key = 'ff929253a79a40478359573471e7a68e';
    const url = `https://newsapi.org/v2/everything?q=${stock.symbol},${stock.companyName}&language=en&to=${date}&sortBy=relevancy&apikey=${key}`;
    axios.get(url)
      .then(res => {
        console.log(res);
        let articles = _.uniqBy(res.data['articles'], 'title');
        console.log(articles);
        this.setState((state, props) => {
          return {
            ...state,
            articles
          }
        });
      })
      .catch(error => console.log(error))
  }

  render() {
    return <FeedList articles={this.state.articles} />
  }
}

export default NewsFeed;
