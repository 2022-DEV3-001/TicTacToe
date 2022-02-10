import React from 'react';
import './styles.scss';
import cx from 'classnames';
import { Props } from 'data/utils/types';

export const Footer = ({ state, actions }: Props) => {
  const { currentPlayer, players, currentWinnerLines, gameIsPaused, gameIsDraw } = state;
  let message = `Your turn player ${currentPlayer.id}`;
  if (gameIsDraw) {
    message = `It's a draw!`;
  } else if (currentWinnerLines.length > 0) {
    message = `Player ${currentPlayer.value} won the game!`;
  }

  return (
    <footer className="footer">
      <div className="current-player-container">
        {players.map((player) => (
          <span
            className={cx(
              'current-player-item',
              player.currentPlayer && `active`,
              player.id === 1 ? 'left' : 'right',
            )}
            key={player.id}
          >
            {player.value}
          </span>
        ))}
      </div>
      {message}

      <ul className="nav-items">
        <li>
          <button className="reload-btn btn" onClick={() => actions.reloadGame()}>
            {gameIsPaused ? 'Continue' : 'Reload'}
          </button>
        </li>
        <li>
          <button className="reset-btn btn" onClick={() => actions.resetGame()}>
            Reset
          </button>
        </li>
      </ul>
    </footer>
  );
};
