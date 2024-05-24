import { useState } from 'react';
import { PDF_VIEWER_SCALE } from '@constants';

interface Props {
  initPageNum?: number;
  initScale: number;
}

const usePdf = ({ initPageNum = 1, initScale }: Props) => {
  const { MAX_SCALE, MIN_SCALE, SCALE_STEP } = PDF_VIEWER_SCALE;

  const [totalPages, setTotalPages] = useState<number>();
  const [currentPageNum, setCurrentPageNum] = useState<number>(initPageNum);
  const [scale, setScale] = useState<number>(initScale);

  const prevPage = () => {
    if (currentPageNum > 1) setCurrentPageNum(currentPageNum - 1);
  };

  const nextPage = () => {
    if (!totalPages) return;
    if (currentPageNum < totalPages) setCurrentPageNum(currentPageNum + 1);
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
    totalPages,
    currentPageNum,
    scale,
    prevPage,
    nextPage,
    zoomIn,
    zoomOut,
    setTotalPages,
  };
};

export default usePdf;
