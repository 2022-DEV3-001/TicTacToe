import React, { ReactElement } from 'react';
import cx from 'classnames';
import './styles.scss';

type Props = {
  value: string;
  onClick: () => void;
};

export const Square = ({ value, ...props }: Props): ReactElement => {
  return (
    <div {...props} data-testid={`square`} className={cx('square')} title={value}>
      {value}
    </div>
  );
};
