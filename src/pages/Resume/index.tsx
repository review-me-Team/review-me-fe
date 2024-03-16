import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, useModal } from 'review-me-design-system';
import { css } from 'styled-components';
import Dropdown from '@components/Dropdown';
import ResumeItem from '@components/ResumeItem';
import Select from '@components/Select';
import YearRangeFilter from '@components/YearRangeFilter';
import useDropdown from '@hooks/useDropdown';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useMediaQuery from '@hooks/useMediaQuery';
import { useUserContext } from '@contexts/userContext';
import { useResumeList } from '@apis/resumeApi';
import { useOccupationList } from '@apis/utilApi';
import { ROUTE_PATH } from '@constants';
import { getRangeText } from '@utils';
import { Filter, FilterContainer, Main, MainHeader, ResumeList, YearRange } from './style';

const Resume = () => {
  const navigate = useNavigate();
  const occupationFilterRef = useRef<HTMLSelectElement>(null);

  const { isLoggedIn, jwt } = useUserContext();

  const [occupationId, setOccupationId] = useState<number | undefined>();
  const [yearRange, setYearRange] = useState<{ startYear: number; endYear: number }>({
    startYear: 0,
    endYear: 10,
  });

  const { matches: isMDevice } = useMediaQuery({ mediaQueryString: '(max-width: 768px)' });

  const rangeText = getRangeText({ min: yearRange.startYear, max: yearRange.endYear });

  const { isDropdownOpen, openDropdown, closeDropdown } = useDropdown();
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal();

  const { data: occupationList } = useOccupationList();
  const { data: resumeListData, fetchNextPage } = useResumeList({
    jwt,
    occupationId,
    startYear: yearRange.startYear,
    endYear: yearRange.endYear,
  });

  const { setTarget } = useIntersectionObserver({
    onIntersect: () => fetchNextPage(),
    options: {
      threshold: 0.5,
    },
  });

  const resumeList = resumeListData?.pages.map((page) => page.resumes).flat();

  return (
    <Main>
      <MainHeader>
        <FilterContainer $isMDevice={isMDevice}>
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
                width: ${isMDevice ? '16rem' : '17.5rem'};
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

      <ResumeList>
        {resumeList?.map((resume) => {
          return (
            <li key={resume.id}>
              <ResumeItem {...resume} />
            </li>
          );
        })}
      </ResumeList>
      <div ref={setTarget}></div>
    </Main>
  );
};

export default Resume;
