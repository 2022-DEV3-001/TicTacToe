import React from 'react';
import { render } from 'react-dom';
import 'app/styles/index.scss';
import TicTacToe from './app/components/tictactoe';

const rootElement: HTMLElement = document.getElementById('root') as HTMLElement;

render(
  <React.StrictMode>
    <TicTacToe />
  </React.StrictMode>,
  rootElement,
);
