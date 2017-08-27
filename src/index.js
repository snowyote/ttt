/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

function copySquares(squares: Squares): Squares {
  return [
    squares[0], squares[1], squares[2],
    squares[3], squares[4], squares[5],
    squares[6], squares[7], squares[8],
  ];
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i=0; i<lines.length; ++i) {
    const [a, b, c] = lines[i];
    if (squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


type Player = 'X' | 'O';
type Squares = [?Player, ?Player, ?Player, ?Player, ?Player, ?Player, ?Player, ?Player, ?Player];
type BoardIndex = 0|1|2|3|4|5|6|7|8;
type BoardProps = {};
type BoardState = {
  squares: Squares;
  xIsNext: boolean,
};

class Board extends React.Component<BoardProps, BoardState> {
  constructor() {
    super();
    this.state = {
      squares: [null, null, null, null, null, null, null, null, null],
      xIsNext: true,
    };
  }

  renderSquare(i: BoardIndex) {
    return (
      <Square value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        />
    );
  }

  handleClick(i: BoardIndex) {
    if (calculateWinner(this.state.squares)) return;
    if (this.state.squares[i]) return;
    let squares = copySquares(this.state.squares);
    squares[i] = this.nextPlayer();
    this.setState({squares:squares, xIsNext:!this.state.xIsNext});
  }

  nextPlayer(): Player {
    return this.state.xIsNext ? 'X' : 'O';
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + this.nextPlayer();
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

type GameProps = {};
type GameState = {};

class Game extends React.Component<GameProps, GameState> {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
