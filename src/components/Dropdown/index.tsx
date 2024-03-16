import type { CSSProp } from 'styled-components';
import React, { ReactNode } from 'react';
import { BackDrop, DropdownItem, DropdownLayout } from './style';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  css: CSSProp;
}

const Dropdown = ({ isOpen, onClose, children, css }: Props) => {
  if (!isOpen) return null;

  return (
    <>
      <BackDrop onClick={onClose} />
      <DropdownLayout $css={css}>{children}</DropdownLayout>
    </>
  );
};

export default Dropdown;

Dropdown.DropdownItem = DropdownItem;
