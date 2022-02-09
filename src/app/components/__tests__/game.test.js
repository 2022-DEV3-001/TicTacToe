/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Board from '../board';
import { Square } from 'ui';
import { checkIfWin } from 'data/utils/functions';

afterEach(() => {
  cleanup();
});

test('Board is rendered', () => {
  render(<Board />);
  expect(screen.getByTestId('board-container')).toBeInTheDocument();
});

test('9 Squares rendered', () => {
  render(<Board />);
  const squares = screen.getAllByTestId('square');
  expect(squares).toHaveLength(9);
});

test('Render once X and O on board', async () => {
  render(<Board />);
  const squares = screen.getAllByTestId('square');
  fireEvent.click(squares[0]);
  fireEvent.click(squares[1]);
  const itemsX = await screen.findAllByText('X');
  const itemsO = await screen.findAllByText('O');
  expect(itemsX).toHaveLength(1);
  expect(itemsO).toHaveLength(1);
});

test('Check if a player wins', async () => {
  const winnerBoard = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
  expect(checkIfWin(winnerBoard)).toBeTruthy();
});

test('Check if already clicked on square', async () => {
  render(<Board />);
  const squares = screen.getAllByTestId('square');
  fireEvent.click(squares[0]);
  fireEvent.click(squares[0]);
  const itemsX = await screen.findAllByText('X');
  expect(itemsX).toHaveLength(1);
});

test('Check if both player loses and all squares are filled', async () => {
  const loserBoard = ['X', 'X', '0', 'X', 'O', 'X', 'O', 'O', 'X'];
  expect(checkIfWin(loserBoard)).toBeFalsy();
  const squareBoard = Array(9).fill('');
  render(<Board />);
  const squares = screen.getAllByTestId('square');
  squareBoard.forEach((value, i) => {
    fireEvent.click(squares[i]);
  });
  const itemsX = await screen.findAllByText('X');
  const itemsO = await screen.findAllByText('O');
  expect(itemsX).toHaveLength(5);
  expect(itemsO).toHaveLength(4);
});

test('square renders when prop value is empty or not equal to X or O', () => {
  render(<Square value="" />);
  expect(screen.getByTestId('square')).toHaveTextContent('');
  render(<Square value="Z" />);
  expect(screen.getByTitle('Z')).toHaveTextContent('');
});

test('square renders when prop value is only X or O', () => {
  render(<Square value="X" />);
  expect(screen.getByText('X')).toHaveTextContent('X');
  render(<Square value="O" />);
  expect(screen.getByText('O')).toHaveTextContent('O');
});
