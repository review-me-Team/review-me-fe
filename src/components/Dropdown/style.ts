import type { CSSProp } from 'styled-components';
import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const DropdownLayout = styled.div<{ $css: CSSProp }>`
  position: absolute;
  padding: 0.25rem;

  background-color: ${theme.color.neutral.bg.default};
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  border: 1px solid ${theme.color.accent.bd.strong};
  border-radius: 0.5rem;

  z-index: ${theme.zIndex.modal};

  ${({ $css }) => $css}
`;

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: ${theme.zIndex.backDrop};
`;

const DropdownItem = styled.button<{ $css?: CSSProp }>`
  width: 100%;

  background-color: transparent;
  border-radius: 8px;

  color: ${theme.color.neutral.text.default};
  ${theme.font.body.default}

  cursor: pointer;

  &:hover {
    background-color: ${theme.palette.green100};
  }

  ${({ $css }) => $css}
`;

export { DropdownLayout, BackDrop, DropdownItem };
