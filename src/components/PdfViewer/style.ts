import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const PDFViewerLayout = styled.div<{ $width: string; $height: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 24.5rem; */
  /* height: 15rem; */
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border: 1px solid ${theme.color.accent.bd.weak};
`;

const PDFViewerContainer = styled.div`
  height: 100%;
  overflow-y: auto;

  & div.react-pdf__Page {
    width: 100% !important;
    height: 100% !important;
  }
  & canvas.react-pdf__Page__canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

export { PDFViewerLayout, PDFViewerContainer };
