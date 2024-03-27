import { theme } from 'review-me-design-system';
import styled from 'styled-components';

export const SkeletonBox = styled.div<{ $width?: string; $height: string }>`
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height};

  border-radius: 0.5rem;
  background-color: ${theme.palette.gray200};
`;

export const SkeletonUserImg = styled.div<{ $width: string; $height: string }>`
  flex-shrink: 0;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};

  border-radius: 50%;
  background-color: ${theme.palette.gray200};
`;
