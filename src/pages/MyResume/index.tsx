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
import { EmptyMyResumeListNotification, MyResumeList } from './style';

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

      {myResumeList && myResumeList.length > 0 ? (
        <MyResumeList>
          {myResumeList.map((resume) => {
            return (
              <li key={resume.id}>
                <MyResumeItem {...resume} />
              </li>
            );
          })}
        </MyResumeList>
      ) : (
        <EmptyMyResumeListNotification>
          <span>작성된 이력서가 없습니다.</span>
          <span>이력서를 공유하여 다양한 의견과 조언을 받아보세요!</span>
        </EmptyMyResumeListNotification>
      )}
      {hasNextPage && !isFetchingNextPage && <div ref={setTarget}></div>}
      {isFetchingNextPage && <Spinner size="4rem" />}
    </PageMain>
  );
};

export default MyResume;
