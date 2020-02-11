import React from 'react';
import './square.scss';
import PropTypes from 'prop-types'

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

Square.defaultProps = {
  value: '',
  style: {}
}

Square.propTypes = {
  value: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func
}