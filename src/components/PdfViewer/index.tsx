import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  PdfViewerLayout,
  PdfViewerInfoContainer,
  PdfPagesInfo,
  PDFViewerWrapper,
  DocumentWrapper,
} from './style';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
  showAllPages: boolean;
  file?: File | string;
  totalPages?: number;
  pageNum?: number;
  onLoadSuccess: (totalPages: number) => void;
  scale?: number;
  width?: string;
  height?: string;
  children?: React.ReactNode;
}

const PdfViewer = ({
  showAllPages,
  file,
  onLoadSuccess,
  totalPages,
  pageNum,
  scale = 1,
  width = '100%',
  height = '100%',
  children,
}: Props) => {
  return (
    <PdfViewerLayout $width={width} $height={height}>
      <PdfViewerInfoContainer>{children}</PdfViewerInfoContainer>
      <PDFViewerWrapper>
        <DocumentWrapper>
          <Document
            file={typeof file === 'string' ? `${process.env.BASE_PDF_URL}/${file}` : file}
            onLoadSuccess={({ numPages }) => onLoadSuccess(numPages)}
          >
            {showAllPages ? (
              Array.from(new Array(totalPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  scale={scale}
                  renderAnnotationLayer={true}
                  renderTextLayer={false}
                />
              ))
            ) : (
              <Page pageNumber={pageNum} scale={scale} renderAnnotationLayer={true} renderTextLayer={false} />
            )}
          </Document>
        </DocumentWrapper>
      </PDFViewerWrapper>
    </PdfViewerLayout>
  );
};

export default PdfViewer;

PdfViewer.PdfPagesInfo = PdfPagesInfo;
