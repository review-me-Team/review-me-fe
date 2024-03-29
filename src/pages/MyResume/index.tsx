import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'review-me-design-system';
import MyResumeItem from '@components/MyResumeItem';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useUserContext } from '@contexts/userContext';
import { useMyResumeList } from '@apis/resumeApi';
import { PageMain } from '@styles/common';
import { ROUTE_PATH } from '@constants';
import { MyResumeList } from './style';

const MyResume = () => {
  const navigate = useNavigate();
  const { jwt } = useUserContext();

  const { data: myResumeListData, fetchNextPage } = useMyResumeList({ jwt });
  const { setTarget } = useIntersectionObserver({
    onIntersect: () => fetchNextPage(),
    options: {
      threshold: 0.5,
    },
  });

  const myResumeList = myResumeListData?.pages.map((page) => page.resumes).flat() ?? [];

  return (
    <PageMain>
      <Button variant="default" size="m" onClick={() => navigate(ROUTE_PATH.RESUME_UPLOAD)}>
        이력서 pdf 올리기
      </Button>

      <MyResumeList>
        {myResumeList.map((resume) => {
          return (
            <li key={resume.id}>
              <MyResumeItem {...resume} />
            </li>
          );
        })}
      </MyResumeList>
      <div ref={setTarget}></div>
    </PageMain>
  );
};

export default MyResume;
