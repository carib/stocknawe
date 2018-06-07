import React from 'react';

export const SearchIcon = () => (
  <svg width='25' height='25' viewBox='0 0 25 25' preserveAspectRatio='xMidYMid'>
    <line x1='17' y1='15' x2='22' y2='19' stroke='#9F9F9F' strokeWidth='3' strokeLinecap='round'/>
    <circle cx='10' cy='10' r='8' fill='none' stroke='#9F9F9F' strokeWidth='3'/>
  </svg>
)

export const lessButton = () => {
  return (
    <svg className="less-button" height="36" width="36" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="16" fill="transparent" strokeWidth="1"/>
      <line x1="12" y1="19" x2="24" y2="19" stroke="#9F9F9F" strokeWidth="2" strokeLinecap='round'/>
    </svg>
  )
}

export const moreButton = () => {
  return (
    <svg className="more-button" height="36" width="36" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="16" fill="transparent" strokeWidth="1"/>
      <line x1="12" y1="19" x2="24" y2="19" stroke="#9F9F9F" strokeWidth="2" strokeLinecap='round'/>
      <line x1="18" y1="13" x2="18" y2="25" stroke="#9F9F9F" strokeWidth="2" strokeLinecap='round'/>
    </svg>
  )
}
