import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const PDFViewerLayout = styled.div<{ $width: string; $height: string }>`
  display: flex;
  justify-content: center;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  overflow-y: auto;
  border: 1px solid ${theme.color.accent.bd.weak};
`;

const PDFViewerContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export { PDFViewerLayout, PDFViewerContainer };
