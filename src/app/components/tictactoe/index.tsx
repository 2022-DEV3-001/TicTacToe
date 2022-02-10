import React from 'react';
import Board from '../board';
import { Nav, Footer } from 'app';
import { AppContext, useAppState } from 'data/context';
import './style.scss';

const TicTacToe = () => {
  const { state, actions } = useAppState();
  return (
    <AppContext.Provider value={{ state, actions }}>
      <div className="container">
        <Nav state={state} actions={actions} />
        <Board state={state} actions={actions} />
        <Footer state={state} actions={actions} />
      </div>
    </AppContext.Provider>
  );
};

export default TicTacToe;
