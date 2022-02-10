/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TicTacToe from '../tictactoe';
import { Square } from 'ui';
import { checkIfWin, userCanPlayAgain } from 'data/utils/functions';

afterEach(() => {
  cleanup();
});

describe('Render components', () => {
  test('App is rendered', () => {
    render(<TicTacToe />);
    expect(screen.getByTestId('board-container')).toBeInTheDocument();
  });

  test('square renders when prop value is empty or not equal to X or O', () => {
    render(<Square value="" />);
    expect(screen.getByTestId('square')).toHaveTextContent('');
    render(<Square value="Z" />);
    expect(screen.getByRole('Z')).toHaveTextContent('');
  });

  test('square renders when prop value is only X or O', () => {
    render(<Square value="X" />);
    expect(screen.getByText('X')).toHaveTextContent('X');
    render(<Square value="O" />);
    expect(screen.getByText('O')).toHaveTextContent('O');
  });

  test('9 Squares rendered', () => {
    render(<TicTacToe />);
    const squares = screen.getAllByTestId('square');
    expect(squares).toHaveLength(9);
  });

  test('Render one X and one O on the board', async () => {
    render(<TicTacToe />);
    const squares = screen.getAllByTestId('square');
    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);
    const itemsX = await screen.findAllByRole('X');
    const itemsO = await screen.findAllByRole('O');
    expect(itemsX).toHaveLength(1);
    expect(itemsO).toHaveLength(1);
  });
});

describe('Test game rules', () => {
  test('Check if a player has won', async () => {
    const winnerBoard = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
    expect(checkIfWin(winnerBoard).length).toBeGreaterThan(0);
  });
  test('Check if draw only if all squares are filled', async () => {
    const loserBoard = ['O', 'X', 'X', 'X', 'X', 'O', 'O', 'O', 'X'];
    expect(checkIfWin(loserBoard)).toHaveLength(0);
    expect(loserBoard.filter(Boolean)).toHaveLength(loserBoard.length);
  });

  test('Players cannot play on a played position', async () => {
    render(<TicTacToe />);
    const squares = screen.getAllByTestId('square');
    fireEvent.click(squares[0]);
    fireEvent.click(squares[0]);
    const itemsX = await screen.findAllByRole('X');
    expect(itemsX).toHaveLength(1);
    expect(userCanPlayAgain('X', false)).toBeFalsy();
    expect(userCanPlayAgain('', false)).toBeTruthy();
    expect(userCanPlayAgain('X', true)).toBeFalsy();
  });
});
