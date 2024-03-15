import React, { useState } from 'react';
import { Button, MultiRangeSlider } from 'review-me-design-system';
import { getRangeText } from '@utils';
import { ButtonsContainer, YearRangeFilterLayout } from './style';

interface Range {
  min: number;
  max: number;
}

interface Props {
  min: number;
  max: number;
  startYear: number;
  endYear: number;
  onCancelRangeChange: () => void;
  onApplyRangeChange: (range: Range) => void;
}

const YearRangeFilter = ({
  min,
  max,
  startYear,
  endYear,
  onCancelRangeChange,
  onApplyRangeChange,
}: Props) => {
  const [range, setRange] = useState<Range>({ min: startYear, max: endYear });
  const rangeText = getRangeText({ min: range.min, max: range.max });

  return (
    <YearRangeFilterLayout>
      <span>{rangeText}</span>
      <MultiRangeSlider hasGreaterCheck={true} min={min} max={max} range={range} onRangeChange={setRange} />
      <ButtonsContainer>
        <Button variant="outline" size="s" onClick={onCancelRangeChange}>
          취소
        </Button>
        <Button
          variant="default"
          size="s"
          onClick={() => {
            onApplyRangeChange(range);
          }}
        >
          적용
        </Button>
      </ButtonsContainer>
    </YearRangeFilterLayout>
  );
};

export default YearRangeFilter;
