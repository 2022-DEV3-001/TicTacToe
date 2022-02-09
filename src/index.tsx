import React from 'react';
import ReactDOM from 'react-dom';
import 'app/styles/index.scss';
import TicTacToe from './app/components/tictactoe';

ReactDOM.render(
  <React.StrictMode>
    <TicTacToe />
  </React.StrictMode>,
  document.getElementById('root'),
);
