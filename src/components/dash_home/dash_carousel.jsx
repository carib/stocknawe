import React from 'react';

import { DashWidget } from './dash_widget';

export const DashCarousel = (props) => {
  const { items, rotateView, viewIndex,  } = props;

  function handleClick(e) {
    if (e) e.preventDefault()
    rotateView()
  }

  return (
    <div className="dash__carousel">
      {
        items.map((item, index) => <DashWidget key={index}
        handleClick={handleClick}
        viewIndex={viewIndex}
        item={item}
        isFirst={index === 0 ? true : false}
        isLast={index === items.length -1 ? true : false}
        />)
      }
    </div>
  )
}
