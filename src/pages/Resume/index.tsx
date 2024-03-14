import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'review-me-design-system';
import ResumeItem from '@components/ResumeItem';
import Select from '@components/Select';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useUserContext } from '@contexts/userContext';
import { useResumeList } from '@apis/resumeApi';
import { useOccupationList } from '@apis/utilApi';
import { ROUTE_PATH } from '@constants';
import { Filter, FilterContainer, Main, MainHeader, ResumeList } from './style';

const Resume = () => {
  const navigate = useNavigate();

  const { isLoggedIn, jwt } = useUserContext();

  const [occupationId, setOccupationId] = useState<number | undefined>();

  const { data: occupationList } = useOccupationList();
  const { data: resumeListData, fetchNextPage } = useResumeList({ jwt, occupationId });

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
        <FilterContainer>
          <Filter>
            <span>직군</span>
            <Select
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
