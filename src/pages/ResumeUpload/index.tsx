import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'review-me-design-system';
import ResumeUploadForm from '@components/ResumeForm/ResumeUploadForm';
import { PageMain } from '@styles/common';
import { ResumeUploadContainer, IconButton, Description, MainDescription, SubDescription } from './style';

const ResumeUpload = () => {
  const navigate = useNavigate();

  return (
    <PageMain>
      <IconButton onClick={() => navigate(-1)}>
        <Icon iconName="leftArrow" />
        <span>뒤로</span>
      </IconButton>

      <ResumeUploadContainer>
        <Description>
          <MainDescription>이력서 pdf를 올려주세요</MainDescription>
          <SubDescription>제출된 이력서 pdf 파일은 변경이 불가합니다.</SubDescription>
        </Description>

        <ResumeUploadForm />
      </ResumeUploadContainer>
    </PageMain>
  );
};

export default ResumeUpload;
