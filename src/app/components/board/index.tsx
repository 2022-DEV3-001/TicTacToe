import React, { useState } from 'react';
import { Square } from 'ui/components/square';
import './style.scss';

const Board = () => {
  const [squareBoard, setSquareBoard] = useState(Array(9).fill(''));

  return (
    <main className="tictactoe-container" data-testid="board-container">
      {squareBoard.map((value: string, i: number) => (
        <Square value={value} key={i} onClick={() => console.log('Clicked on square')} />
      ))}
    </main>
  );
};

export default Board;
