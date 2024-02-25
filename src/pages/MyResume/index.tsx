import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'review-me-design-system';
import MyResumeItem from '@components/MyResumeItem';
import { ROUTE_PATH } from '@constants';
import { Main, MyResumeList } from './style';

const MyResume = () => {
  const navigate = useNavigate();

  return (
    <Main>
      <Button variant="default" size="m" onClick={() => navigate(ROUTE_PATH.RESUME_UPLOAD)}>
        이력서 pdf 올리기
      </Button>

      <MyResumeList>
        <MyResumeItem
          id={1}
          title="이력서 제목"
          year={0}
          occupation="backend"
          scope="전체 공개"
          createdAt="2023-12-22 15:16:42"
        />
        <MyResumeItem
          id={2}
          title="이력서 제목"
          year={0}
          occupation="backend"
          scope="전체 공개"
          createdAt="2023-12-22 15:16:42"
        />
        <MyResumeItem
          id={3}
          title="이력서 제목"
          year={0}
          occupation="backend"
          scope="전체 공개"
          createdAt="2023-12-22 15:16:42"
        />
        <MyResumeItem
          id={4}
          title="이력서 제목"
          year={0}
          occupation="backend"
          scope="전체 공개"
          createdAt="2023-12-22 15:16:42"
        />
        <MyResumeItem
          id={5}
          title="이력서 제목"
          year={0}
          occupation="backend"
          scope="전체 공개"
          createdAt="2023-12-22 15:16:42"
        />
      </MyResumeList>
    </Main>
  );
};

export default MyResume;
