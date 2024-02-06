import React, { ReactNode } from 'react';
import { Button, ButtonGroupLayout } from './style';

interface Props {
  height: string;
  children: ReactNode;
}

const ButtonGroup = ({ height, children }: Props) => {
  return <ButtonGroupLayout $height={height}>{children}</ButtonGroupLayout>;
};

export default ButtonGroup;

ButtonGroup.Button = Button;
