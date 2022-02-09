import { Props } from 'data/utils/types';
import React from 'react';
import Board from '../board';
import './style.scss';

const TicTacToe = ({ state, actions }: Props) => {
  return (
    <div className="container">
      <Board state={state} actions={actions} />
    </div>
  );
};

export default TicTacToe;
