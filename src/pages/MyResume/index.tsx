import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'review-me-design-system';
import MyResumeItem from '@components/MyResumeItem';
import Spinner from '@components/Spinner';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useUserContext } from '@contexts/userContext';
import { useMyResumeList } from '@apis/resumeApi';
import { PageMain } from '@styles/common';
import { ROUTE_PATH } from '@constants';
import { MyResumeList } from './style';

const MyResume = () => {
  const navigate = useNavigate();
  const { jwt } = useUserContext();

  const { data: myResumeList, fetchNextPage, hasNextPage, isFetchingNextPage } = useMyResumeList({ jwt });
  const { setTarget } = useIntersectionObserver({
    onIntersect: () => fetchNextPage(),
    options: {
      threshold: 0.5,
    },
  });

  return (
    <PageMain>
      <Button variant="default" size="m" onClick={() => navigate(ROUTE_PATH.RESUME_UPLOAD)}>
        이력서 pdf 올리기
      </Button>

      <MyResumeList>
        {myResumeList?.map((resume) => {
          return (
            <li key={resume.id}>
              <MyResumeItem {...resume} />
            </li>
          );
        })}
      </MyResumeList>
      {hasNextPage && !isFetchingNextPage && <div ref={setTarget}></div>}
      {isFetchingNextPage && <Spinner size="4rem" />}
    </PageMain>
  );
};

export default MyResume;
