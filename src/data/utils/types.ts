import { ActionsType } from '../context';

export interface PlayerProps {
  id: number;
  value: string;
  wins: number;
  currentPlayer: boolean;
}
export interface GameStateProps {
  gameIsPaused: boolean;
  gameIsDraw: boolean;
  players: PlayerProps[];
  currentPlayer: PlayerProps;
  squareBoard: string[];
  draws: number;
  currentWinnerLines: number[];
}

export interface Props {
  state: GameStateProps;
  actions: ActionsType;
}
