import React from 'react';

export const ListItem = ({ item }) => {
  return (
    <div className="list-item">
      <div className="list-item__title">{item[0]}</div>
      <div className="list-item__detail">{item[1].price}</div>
    </div>
  )
}
