import React, { FC } from 'react';

type Button1Props = {
  onClkck: () => void;
};
export const Button1: FC<Button1Props> = ({ onClkck, children }) => (
  <>
    <button type="button" onClick={onClkck}>
      {children}
    </button>
  </>
);
