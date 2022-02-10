import { GameStateProps, PlayerProps } from 'data/utils/types';
import { useState, useContext, createContext, useEffect } from 'react';
import UseStorage from 'data/utils/useLocalStorage';

const { getItemFromStorage, setItemInStorage, clearStorage } = UseStorage();

const initPlayers: PlayerProps[] = [
  { id: 1, value: 'X', wins: 0, currentPlayer: true },
  { id: 2, value: 'O', wins: 0, currentPlayer: false },
];

const initialGameState: GameStateProps = {
  gameIsPaused: false,
  gameIsDraw: false,
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
    setGameIsPaused: (gameIsPaused: boolean) => {
      setItemInStorage('gameIsPaused', JSON.stringify(gameIsPaused));
      setState((oldState) => ({ ...oldState, gameIsPaused }));
    },
    setGameIsDraw: (gameIsDraw: boolean) => {
      setItemInStorage('gameIsDraw', JSON.stringify(gameIsDraw));
      setState((oldState) => ({ ...oldState, gameIsDraw }));
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
      setItemInStorage('currentWinnerLines', JSON.stringify(currentWinnerLines));
      setState((oldState) => ({ ...oldState, currentWinnerLines }));
    },
    incrementDraw: () => {
      setState((oldState) => {
        const draws = oldState.draws + 1;
        setItemInStorage('draws', JSON.stringify(draws));
        return { ...oldState, draws };
      });
    },
    reloadGame: () => {
      actions.setGameIsPaused(false);
      actions.setGameIsDraw(false);
      actions.setCurrentWinnerLines([]);
      actions.setPlayers([
        { ...state.players[0], currentPlayer: true },
        { ...state.players[1], currentPlayer: false },
      ]);
      actions.setCurrentPlayer(initialGameState.players[0]);
      actions.setSquareBoard(Array(9).fill(''));
    },
    resetGame: () => {
      actions.reloadGame();
      actions.setPlayers(initialGameState.players);
      setItemInStorage('draws', JSON.stringify(0));
      setState((oldState) => ({ ...oldState, draws: 0 }));
      clearStorage();
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
    gameIsPaused: checkInitialState('gameIsPaused', initialGameState.gameIsPaused),
    gameIsDraw: checkInitialState('gameIsDraw', initialGameState.gameIsDraw),
    players: checkInitialState('players', initialGameState.players),
    currentPlayer: checkInitialState('currentPlayer', initialGameState.currentPlayer),
    squareBoard: checkInitialState('squareBoard', initialGameState.squareBoard),
    currentWinnerLines: checkInitialState(
      'currentWinnerLines',
      initialGameState.currentWinnerLines,
    ),
    draws: checkInitialState('draws', initialGameState.draws),
  });

  useEffect(() => {
    setState(setStateFunction);
  }, []);

  return { state, actions };
};

const useAppContext = () => useContext(AppContext);

export { AppContext, useAppState, useAppContext, initialGameState };
