import { PlayerProps } from './types';

// Check if their is a winner
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkIfWin = (board: string[]) => {
  for (const conditions of winConditions) {
    let [a, b, c] = conditions;
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      return conditions;
    }
  }
  return [];
};

export const getCurrentPlayerIndex = (players: PlayerProps[], currentPlayer: PlayerProps) => {
  return players.findIndex((player: PlayerProps) => player.id === currentPlayer.id);
};
