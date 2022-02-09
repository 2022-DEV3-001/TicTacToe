import { GameStateProps, PlayerProps } from 'data/utils/types';
import { useState, useContext, createContext, useEffect } from 'react';
import UseStorage from 'data/utils/useLocalStorage';

const { getItemFromStorage, setItemInStorage, removeItemFromStorage } = UseStorage();

const initPlayers: PlayerProps[] = [
  { id: 1, value: 'X', wins: 0, currentPlayer: true },
  { id: 2, value: 'O', wins: 0, currentPlayer: false },
];

const initialGameState: GameStateProps = {
  pauseGame: false,
  players: initPlayers,
  currentPlayer: initPlayers[0],
  squareBoard: Array(9).fill(''),
  draws: 0,
  currentWinnerLines: [],
};

const AppContext = createContext({});

// APP STATE
export type ActionsType = ReturnType<typeof useAppState>['actions'];

const useAppState = () => {
  const [state, setState] = useState(initialGameState);
  const actions = {
    setPauseGame: (pauseGame: boolean) => {
      setItemInStorage('pauseGame', JSON.stringify(pauseGame));
      setState((oldState) => ({ ...oldState, pauseGame }));
    },
    setPlayers: (players: PlayerProps[]) => {
      setItemInStorage('players', JSON.stringify(players));
      setState((oldState) => ({ ...oldState, players }));
    },
    setCurrentPlayer: (currentPlayer: PlayerProps) => {
      setItemInStorage('currentPlayer', JSON.stringify(currentPlayer));
      setState((oldState) => ({ ...oldState, currentPlayer }));
    },
    setSquareBoard: (squareBoard: string[]) => {
      setItemInStorage('squareBoard', JSON.stringify(squareBoard));
      setState((oldState) => ({ ...oldState, squareBoard }));
    },
    setCurrentWinnerLines: (currentWinnerLines: [] | number[]) => {
      setState((oldState) => ({ ...oldState, currentWinnerLines }));
    },
    incrementDraw: () => {
      setState((oldState) => {
        const draws = oldState.draws + 1;
        setItemInStorage('draws', JSON.stringify(draws));
        return { ...oldState, draws };
      });
    },
    resetGame: () => {
      actions.setPauseGame(false);
      actions.setCurrentPlayer(initialGameState.players[0]);
      actions.setSquareBoard(Array(9).fill(''));
    },
  };

  function checkInitialState<Type>(name: string, currentState: Type) {
    if (typeof currentState === 'string') {
      return getItemFromStorage(name) ?? currentState;
    }
    return getItemFromStorage(name) ? JSON.parse(getItemFromStorage(name)) : currentState;
  }

  // Use local or session storage
  const setStateFunction = () => ({
    ...initialGameState,
    pauseGame: checkInitialState('pauseGame', initialGameState.pauseGame),
    players: checkInitialState('players', initialGameState.players),
    currentPlayer: checkInitialState('currentPlayer', initialGameState.currentPlayer),
    squareBoard: checkInitialState('squareBoard', initialGameState.squareBoard),
    draws: checkInitialState('draws', initialGameState.draws),
  });

  useEffect(() => {
    setState(setStateFunction);
  }, []);

  return { state, actions };
};

const useAppContext = () => useContext(AppContext);

export { AppContext, useAppState, useAppContext, initialGameState };
