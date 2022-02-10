import { Props } from 'data/utils/types';
import React from 'react';
import './styles.scss';

export const Nav = ({ state }: Props) => (
  <nav>
    <ul className="nav-items">
      <li className="primary-item">
        <span>X</span>
        {state.players[0].wins} Wins
      </li>
      <li className="secondary-item">
        <span>O</span>
        {state.players[1].wins} Wins
      </li>
      <li className="grey-item">
        <span> = </span>
        {state.draws} {state.draws === 1 ? 'Draw' : 'Draws'}
      </li>
    </ul>
  </nav>
);
