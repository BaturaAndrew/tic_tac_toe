import React from 'react';
import './square.scss';

function Square(props) {
  return (
    <button
      className='square'
      onClick={props.onClick}
      style={props.style}
    >
      {props.value}
    </button>
  );
}
export default Square;
