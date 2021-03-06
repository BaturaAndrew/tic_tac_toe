import React from 'react';
import Square from './Square/Square';
import PropTypes from 'prop-types';

const winnerStyle = {
  color: 'red'
};
const activeStyle = {
  borderLeft: '2px solid #bbb',
  borderTop: '2px solid #bbb',
  borderRight: '0px solid #bbb',
  borderBottom: '0px solid #bbb',
  background: '#bbb',
  pointerEvents: 'none'
};

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.dimention = 3;
  }
  renderSquare(i) {
    const lastSquare = this.props.lastSquare;
    const active = (i === lastSquare) ? 'active' : '';
    const winner = this.props.winner;
    let winnerPosition = [];
    let style = null;
    if (active) {
      style = activeStyle;
    }

    if (winner >= 0 && winner !== false) {
      winnerPosition = this.props.winnerPosition;
      if (winnerPosition.indexOf(i, 0) !== -1)
        style = winnerStyle;
    }
    return <Square
      key={i}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      style={style}
    />;
  }
  renderRow(i) {
    let row = [];
    for (let j = 0; j < this.dimention; j++) {
      row.push(this.renderSquare(j + i * this.dimention));
    }
    return row;
  }
  render() {
    let rows = [];
    for (let i = 0; i < this.dimention; i++) {
      rows.push(
        <div key={i} className="board-row">
          {this.renderRow(i)}
        </div>
      )
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
}

export default Board;


Board.defaultProps = {
  lastSquare: null,
  winner: false,
  winnerPosition: null,
  squares: null
}

Board.propTypes = {
  lastSquare: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ]),
  winner: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ]),
  winnerPosition: PropTypes.array,
  squares: PropTypes.array,
  onClick: PropTypes.func
}