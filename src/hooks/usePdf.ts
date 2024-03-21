import { useState } from 'react';
import { breakPoints } from '@styles/common';
import { PDF_VIEWER_SCALE } from '@constants';
import useMediaQuery from './useMediaQuery';

interface Props {
  initPageNum?: number;
}

const usePdf = ({ initPageNum = 1 }: Props) => {
  const { MAX_SCALE, MIN_SCALE, SCALE_STEP } = PDF_VIEWER_SCALE;

  const { matches: isMobile } = useMediaQuery({ mediaQueryString: breakPoints.mobile });

  const INIT_SCALE = isMobile ? 0.8 : 1.2;

  const [totalPages, setTotalPages] = useState<number>();
  const [currentPageNum, setCurrentPageNum] = useState<number>(initPageNum);
  const [scale, setScale] = useState<number>(INIT_SCALE);

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
