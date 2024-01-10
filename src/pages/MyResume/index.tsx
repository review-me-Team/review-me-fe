import React from 'react';
import { Button } from 'review-me-design-system';
import Header from '@components/Header';
import MyResumeItem from '@components/MyResumeItem';
import { Main, MyResumeLayout, MyResumeList } from './style';

const MyResume = () => {
  return (
    <MyResumeLayout>
      <Header />
      <Main>
        <div>
          <Button variant="default" size="m">
            이력서 pdf 올리기
          </Button>
        </div>

        <MyResumeList>
          <MyResumeItem
            title="이력서 제목"
            year={0}
            occupation="backend"
            scope="전체 공개"
            createdAt="2023-12-22 15:16:42"
          />
          <MyResumeItem
            title="이력서 제목"
            year={0}
            occupation="backend"
            scope="전체 공개"
            createdAt="2023-12-22 15:16:42"
          />
          <MyResumeItem
            title="이력서 제목"
            year={0}
            occupation="backend"
            scope="전체 공개"
            createdAt="2023-12-22 15:16:42"
          />
          <MyResumeItem
            title="이력서 제목"
            year={0}
            occupation="backend"
            scope="전체 공개"
            createdAt="2023-12-22 15:16:42"
          />
          <MyResumeItem
            title="이력서 제목"
            year={0}
            occupation="backend"
            scope="전체 공개"
            createdAt="2023-12-22 15:16:42"
          />
        </MyResumeList>
      </Main>
    </MyResumeLayout>
  );
};

export default MyResume;
