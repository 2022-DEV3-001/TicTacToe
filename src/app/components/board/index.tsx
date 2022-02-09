import { checkIfWin, getCurrentPlayerIndex } from 'data/utils/functions';
import { PlayerProps, Props } from 'data/utils/types';
import React from 'react';
import cx from 'classnames';
import { Square } from 'ui/components/square';
import './style.scss';

const Board = ({ state, actions }: Props) => {
  const { squareBoard, currentPlayer, players, pauseGame, currentWinnerLines } = state;
  const {
    setSquareBoard,
    setPauseGame,
    setPlayers,
    setCurrentPlayer,
    setCurrentWinnerLines,
    incrementDraw,
  } = actions;

  const handleSquareClick = (index: number) => {
    const newSquareBoard = squareBoard;
    newSquareBoard[index] = currentPlayer.value;
    setSquareBoard(newSquareBoard);
    const playerIndex = getCurrentPlayerIndex(players, currentPlayer);
    const newPlayers = [...players].map((player: PlayerProps) => {
      player.currentPlayer = !player.currentPlayer;
      return player;
    });
    // Check if user wins
    if (checkIfWin(newSquareBoard).length !== 0) {
      setCurrentWinnerLines(checkIfWin(newSquareBoard));
      setPauseGame(true);
      console.log(`Player ${currentPlayer.id} wins!`);
      newPlayers[playerIndex] = {
        ...newPlayers[playerIndex],
        wins: newPlayers[playerIndex].wins + 1,
      };
      setPlayers(newPlayers);
    } else {
      // Check if draw
      if (newSquareBoard.filter(Boolean).length === squareBoard.length) {
        incrementDraw();
      }
      setPlayers(newPlayers);
      setCurrentPlayer(currentPlayer.id === 1 ? newPlayers[1] : newPlayers[0]);
    }
  };

  return (
    <main className="tictactoe-board" data-testid="board-container">
      {squareBoard.map((value: string, i: number) => (
        <Square
          value={value}
          index={i}
          key={i}
          className={cx(currentWinnerLines.length > 0 && currentWinnerLines.includes(i) && 'win')}
          onClick={() => !value && !pauseGame && handleSquareClick(i)}
        />
      ))}
    </main>
  );
};

export default Board;
