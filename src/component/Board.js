import React from 'react';
import Square from './Square/Square';

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
    let style = null;
    let winnerPosition = [];

    if (winner >= 0 && winner !== false) {
      winnerPosition = this.props.winnerPosition;
      if (winnerPosition.indexOf(i, 0) !== -1)
        style = winnerStyle;
    }
    return <Square
      key={i}
      value={this.props.squares[i]}
      active={active}
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