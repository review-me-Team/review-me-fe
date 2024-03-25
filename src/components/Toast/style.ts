import { theme } from 'review-me-design-system';
import styled from 'styled-components';
import { breakPoints, fadeIn } from '@styles/common';

const ToastLayout = styled.li<{ $isOpen: boolean; $type: 'success' | 'error' }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 20rem;
  height: fit-content;
  padding: 0.5rem 1rem;
  position: fixed;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);

  background-color: ${({ $type }) => ($type === 'error' ? theme.palette.red : theme.palette.blue)};
  border-radius: 1rem;
  box-shadow: 0 1rem 1.75rem rgba(0, 0, 0, 0.08);

  ${theme.font.body.default}
  color: ${theme.color.neutral.text.weak};

  z-index: 999;

  animation: ${fadeIn} 0.5s;

  @media ${breakPoints.mobile} {
    width: 80%;
  }
`;

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  margin-left: 1rem;

  cursor: pointer;
`;

export { ToastLayout, IconButton };
