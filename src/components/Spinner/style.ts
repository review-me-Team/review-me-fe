import { theme } from 'review-me-design-system';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerLayout = styled.div<{ $size: string }>`
  margin: 0 auto;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};

  border: 1rem solid ${theme.palette.green200};
  border-top: 1rem solid ${theme.palette.green500};
  border-radius: 50%;

  animation: ${rotate} 1s linear infinite;
`;

export { SpinnerLayout };
