import React from 'react';
import { render } from 'react-dom';
import 'app/styles/index.scss';
import TicTacToe from './app/components/tictactoe';
import { AppContext, useAppState } from 'data/context';

const rootElement: HTMLElement = document.getElementById('root') as HTMLElement;

const App = () => {
  const { state, actions } = useAppState();
  return (
    <AppContext.Provider value={{ state, actions }}>
      <TicTacToe state={state} actions={actions} />
    </AppContext.Provider>
  );
};
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement,
);
