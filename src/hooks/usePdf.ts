import { useState } from 'react';
import { PDF_VIEWER_SCALE } from '@constants';

interface Props {
  initPageNum?: number;
}

const usePdf = ({ initPageNum = 1 }: Props) => {
  const { INIT_SCALE, MAX_SCALE, MIN_SCALE, SCALE_STEP } = PDF_VIEWER_SCALE;

  const [numPages, setNumPages] = useState<number>();
  const [currentPageNum, setCurrentPageNum] = useState<number>(initPageNum);
  const [scale, setScale] = useState<number>(INIT_SCALE);

  const prevPage = () => {
    if (currentPageNum > 1) setCurrentPageNum(currentPageNum - 1);
  };

  const nextPage = () => {
    if (!numPages) return;
    if (currentPageNum < numPages) setCurrentPageNum(currentPageNum + 1);
  };

  const zoomIn = () => {
    if (scale < MAX_SCALE) {
      setScale((scale) => Math.round((scale + SCALE_STEP) * 10) / 10);
    }
  };

  const zoomOut = () => {
    if (scale > MIN_SCALE) {
      setScale((scale) => Math.round((scale - SCALE_STEP) * 10) / 10);
    }
  };

  return {
    numPages,
    currentPageNum,
    scale,
    prevPage,
    nextPage,
    zoomIn,
    zoomOut,
    setNumPages,
  };
};

export default usePdf;
