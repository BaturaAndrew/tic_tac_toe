import React from "react";
import Board from "../Board";
import './game.scss';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        coord: { x: 0, y: 0 },
      }],
      xIsNext: true,
      stepNumber: 0
    }
  }

  handleSquareClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const coord = this.position(i);
    if (calculateWinner(squares) || squares[i]) return;
    const xIsNext = this.state.xIsNext;
    squares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        coord: coord,
      }]),
      xIsNext: !xIsNext,
      stepNumber: history.length,
      lastSquare: i,
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      lastSquare: null
    })
  }

  position(i) {
    const dimention = 3;
    const diff = (i + 1) - dimention * 2;
    if (diff > 0) {
      return { x: diff, y: 3 }
    } else {
      if (diff > -3 && diff <= 0) {
        return { x: diff + 3, y: 2 }
      }
      else {
        return { x: diff + 6, y: 1 }
      }
    }
  }

  steps() {
    const history = this.state.history;
    const steps = history.map((step, move) => {
      const desc = move ?
        'Go to step #' + move :
        'Go to start of game';
      return (
        <li className='flex-row' key={move}>
          <button className='step-status' onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
          <p className='coord'>{`position  X: ${step.coord.x} Y: ${step.coord.y}`}</p>
        </li>
      )
    })
    return steps;
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winnerPosition = calculateWinner(current.squares);
    const winner = (winnerPosition !== null) ? winnerPosition[0] : false;

    let status;
    let player = this.state.xIsNext ? 'X' : 'Y';
    if (winner !== false) {
      status = 'Winner ';
      player = current.squares[winner];
    }
    else status = ' Next player ';

    return (
      <div className="game flex-row">
        <div className="game-conteiner flex-column">
          <div className="status">{status}<span>{player}</span></div>
          <div className="game-block flex-row">
            <div className="game-board">
              <Board
                squares={current.squares}
                lastSquare={this.state.lastSquare}
                winner={winner}
                winnerPosition={winnerPosition}
                onClick={(i) => this.handleSquareClick(i)}
              />
            </div>
            <div className="game-info">
              <ol className="step">{this.steps()}</ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Game;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}