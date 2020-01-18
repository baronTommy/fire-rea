import React, { FC } from 'react';

type Button1Props = {
  onClkck: () => void;
};
export const Button1: FC<Button1Props> = ({ onClkck }) => (
  <>
    <button type="button" onClick={onClkck}>
      ポチ
    </button>
  </>
);
