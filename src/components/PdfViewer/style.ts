import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const PdfViewerLayout = styled.div<{ $width: string; $height: string }>`
  position: relative;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  overflow-y: auto;
`;

const PDFViewerWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  overflow-y: auto;
  border: 1px solid ${theme.color.accent.bd.weak};
`;

const DocumentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const PdfViewerInfoContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  z-index: ${theme.zIndex.floating};
`;

const PdfPagesInfo = styled.span`
  display: flex;
  align-items: center;
  padding: 0 0.25rem;

  border-radius: 0.5rem;
  background-color: ${theme.color.accent.bg.default};

  ${theme.font.body.default}
  color: ${theme.color.neutral.text.weak};
`;

export { PdfViewerLayout, PDFViewerWrapper, DocumentWrapper, PdfViewerInfoContainer, PdfPagesInfo };
