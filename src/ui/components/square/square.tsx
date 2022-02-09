import React, { ReactElement } from 'react';
import cx from 'classnames';
import './styles.scss';

type Props = {
  value: string;
  index: number;
  onClick: () => void;
};

export const Square = ({ value, index, ...props }: Props): ReactElement => {
  return (
    <div
      {...props}
      data-testid={`square`}
      className={cx('square', value === 'O' && 'secondary')}
      title={value}
    >
      {(value === '' || value === 'X' || value === 'O') && value}
    </div>
  );
};
