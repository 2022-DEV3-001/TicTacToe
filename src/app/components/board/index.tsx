import { PlayerProps } from 'data/utils/types';
import React, { useState } from 'react';
import { Square } from 'ui/components/square';
import './style.scss';

const Board = () => {
  const initPlayers: PlayerProps[] = [
    { id: 1, value: 'X', wins: 0, currentPlayer: true },
    { id: 2, value: 'O', wins: 0, currentPlayer: false },
  ];

  const [squareBoard, setSquareBoard] = useState(Array(9).fill(''));
  const [players, setPlayers] = useState(initPlayers);
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);

  const handleSquareClick = (index: number) => {
    const newPlayers = [...players].map((player: PlayerProps) => {
      player.currentPlayer = !player.currentPlayer;
      return player;
    });

    const newSquareBoard = squareBoard;
    newSquareBoard[index] = currentPlayer.value;

    setSquareBoard(newSquareBoard);
    setPlayers(newPlayers);
    setCurrentPlayer(currentPlayer.id === 1 ? newPlayers[1] : newPlayers[0]);
  };

  return (
    <main className="tictactoe-board" data-testid="board-container">
      {squareBoard.map((value: string, i: number) => (
        <Square value={value} index={i} key={i} onClick={() => !value && handleSquareClick(i)} />
      ))}
    </main>
  );
};

export default Board;
