import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFViewerContainer, PDFViewerLayout } from './style';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
  file?: File;
  numPages?: number;
  onLoadSuccess: (numPages: number) => void;
  width?: string;
  height: string;
}

const PdfViewer = ({ file, onLoadSuccess, numPages, width = '100%', height }: Props) => {
  return (
    <PDFViewerLayout $width={width} $height={height}>
      <PDFViewerContainer>
        <Document file={file} onLoadSuccess={({ numPages }) => onLoadSuccess(numPages)}>
          {numPages &&
            Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            ))}
        </Document>
      </PDFViewerContainer>
    </PDFViewerLayout>
  );
};

export default PdfViewer;