import React, { Suspense, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'review-me-design-system';
import { css } from 'styled-components';
import DelayedComponent from '@components/DelayedComponent';
import Dropdown from '@components/Dropdown';
import ResumeList from '@components/ResumeList';
import SkeletonResumeList from '@components/ResumeList/skeleton';
import Select from '@components/Select';
import YearRangeFilter from '@components/YearRangeFilter';
import useDropdown from '@hooks/useDropdown';
import useMediaQuery from '@hooks/useMediaQuery';
import { useUserContext } from '@contexts/userContext';
import { useOccupationList } from '@apis/utilApi';
import { PageMain, breakPoints } from '@styles/common';
import { ROUTE_PATH } from '@constants';
import { getRangeText } from '@utils';
import { Filter, FilterContainer, MainHeader, YearRange } from './style';

const Resume = () => {
  const navigate = useNavigate();
  const occupationFilterRef = useRef<HTMLSelectElement>(null);

  const { isLoggedIn } = useUserContext();

  const [occupationId, setOccupationId] = useState<number | undefined>();
  const [yearRange, setYearRange] = useState<{ startYear: number; endYear: number }>({
    startYear: 0,
    endYear: 10,
  });

  const { matches: isMobile } = useMediaQuery({ mediaQueryString: breakPoints.mobile });

  const rangeText = getRangeText({ min: yearRange.startYear, max: yearRange.endYear });

  const { isDropdownOpen, openDropdown, closeDropdown } = useDropdown();

  const { data: occupationList } = useOccupationList();

  return (
    <PageMain>
      <MainHeader>
        <FilterContainer $isMDevice={isMobile}>
          <Filter>
            <span
              onClick={() => {
                occupationFilterRef.current?.focus();
              }}
            >
              직군
            </span>
            <Select
              ref={occupationFilterRef}
              value={occupationId}
              defaultValue={'all'}
              onChange={(e) => {
                if (e.target.value === 'all') {
                  setOccupationId(undefined);
                  return;
                }

                setOccupationId(Number(e.target.value));
              }}
              width="10.25rem"
            >
              <option value="all">전체</option>
              {occupationList?.map(({ id, occupation }) => {
                return (
                  <option key={id} value={id}>
                    {occupation}
                  </option>
                );
              })}
            </Select>
          </Filter>
          <Filter>
            <span>경력</span>
            <YearRange
              onClick={() => {
                if (isDropdownOpen) {
                  closeDropdown();
                  return;
                }
                openDropdown();
              }}
            >
              <span>{rangeText}</span>
            </YearRange>
            <Dropdown
              isOpen={isDropdownOpen}
              onClose={closeDropdown}
              css={css`
                width: ${isMobile ? '16rem' : '17.5rem'};
                top: 2.875rem;
                left: 0;
              `}
            >
              <YearRangeFilter
                min={0}
                max={10}
                startYear={yearRange.startYear}
                endYear={yearRange.endYear}
                onCancelRangeChange={closeDropdown}
                onApplyRangeChange={(range) => {
                  setYearRange({ startYear: range.min, endYear: range.max });
                  closeDropdown();
                }}
              />
            </Dropdown>
          </Filter>
        </FilterContainer>

        {isLoggedIn && (
          <Button
            variant="default"
            size="m"
            onClick={() => {
              if (isLoggedIn) navigate(ROUTE_PATH.MY_RESUME);
            }}
          >
            내 이력서 보러가기
          </Button>
        )}
      </MainHeader>

      <Suspense
        fallback={
          <DelayedComponent>
            <SkeletonResumeList />
          </DelayedComponent>
        }
      >
        <ResumeList occupationId={occupationId} startYear={yearRange.startYear} endYear={yearRange.endYear} />
      </Suspense>
    </PageMain>
  );
};

export default Resume;
