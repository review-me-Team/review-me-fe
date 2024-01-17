import React from 'react';
import { Button, useModal } from 'review-me-design-system';
import Header from '@components/Header';
import ResumeUploadModal from '@components/Modal/ResumeUploadModal';
import MyResumeItem from '@components/MyResumeItem';
import { Main, MyResumeLayout, MyResumeList } from './style';

const MyResume = () => {
  const { isOpen: isOpenUploadModal, open: openUploadModal, close: closeUploadModal } = useModal();

  return (
    <MyResumeLayout>
      <Header />
      <Main>
        <Button variant="default" size="m" onClick={openUploadModal}>
          이력서 pdf 올리기
        </Button>
        <ResumeUploadModal isOpen={isOpenUploadModal} onClose={closeUploadModal} />

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
    </MyResumeLayout>
  );
};

export default MyResume;
