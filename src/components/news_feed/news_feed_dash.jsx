import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import _ from 'lodash';

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
    const url = `https://newsapi.org/v2/everything?q=${stock.symbol}` +
                `&language=en&to=${date}` +
                `&sortBy=popularity` +
                `&apiKey=${key}`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        let articles = _.values(json.articles);
        articles = _.uniqBy(articles, 'title');
        this.setState((state, props) => {
          return {
            ...state,
            articles
          }
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return <FeedList articles={this.state.articles} />
  }
}

export default withRouter(NewsFeed);
