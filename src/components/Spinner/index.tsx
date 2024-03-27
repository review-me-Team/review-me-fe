import React from 'react';
import { SpinnerLayout } from './style';

interface Props {
  size: string;
}

const Spinner = ({ size }: Props) => {
  return <SpinnerLayout $size={size} />;
};

export default Spinner;
