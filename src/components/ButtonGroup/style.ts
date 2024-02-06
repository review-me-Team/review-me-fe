import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const ButtonGroupLayout = styled.div<{ $height: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ $height }) => $height};

  border: 1px solid ${theme.color.accent.bd.weak};
  background-color: ${theme.color.neutral.bg.default};

  & > button:last-child {
    border-right: none;
  }
`;

const Button = styled.button`
  display: flex;
  height: 100%;
  padding: 0 0.5rem;
  justify-content: center;
  align-items: center;

  border-right: 1px solid ${theme.color.accent.bd.weak};
  background-color: ${theme.color.neutral.bg.default};

  cursor: pointer;
`;

export { ButtonGroupLayout, Button };
