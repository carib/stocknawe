import React from 'react';

function parseDate(date) {
  return `${new Date(date)}`
}

export const FeedItem = ({item}) => {
  return (
    <a className="feed-item" href={item.url} target="_blank">
      <div className="feed-item__head">
        <div className="feed-item__title">{item.title}</div>
        <div className="feed-item__source">{item.source.name}</div>
        <div className="feed-item__date">{parseDate(item.publishedAt)}</div>
      </div>
      <div className="feed-item__description">{item.description}</div>
    </a>
  )
}
