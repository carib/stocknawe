import React from 'react';

function parseDate(date) {
  return `${new Date(date)}`
}

export const FeedItem = ({item}) => (
  <div className="feed-item">
    <div className="feed-item__head">
      <a className="feed-item__title" href={item.url} target="_blank">{item.title}</a>
      <div className="feed-item__source">{item.source.name}</div>
      <div className="feed-item__date">{parseDate(item.publishedAt)}</div>
    </div>
    <div className="feed-item__description">{item.description}</div>
  </div>
)
