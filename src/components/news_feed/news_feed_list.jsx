import React from 'react';

import { FeedItem } from './news_feed_item';
export const FeedList = ({ articles }) => (

  <div className="news-feed">
    {
      articles.map((item, index) => <FeedItem key={index} item={item} />)
    }
  </div>
);
