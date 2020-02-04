import React from 'react';
import './square.scss';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  handleClick() {
    this.setState({ value: 'X' });
  }

  render() {
    return (
      <button className="square" onClick={(e) => this.handleClick(e)}>
        {this.state.value}
      </button>
    );
  }
}
export default Square;
