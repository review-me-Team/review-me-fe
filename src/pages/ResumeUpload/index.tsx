import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'review-me-design-system';
import ResumeUploadForm from '@components/ResumeForm/ResumeUploadForm';
import { usePostResume } from '@apis/resumeApi';
import { Occupation, Scope } from '@apis/utilApi';
import { PageMain } from '@styles/common';
import { ResumeUploadContainer, IconButton, Description, MainDescription, SubDescription } from './style';

const ResumeUpload = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | undefined>();
  const [title, setTitle] = useState<string>('');
  const [selectedOccupation, setSelectedOccupation] = useState<Occupation | undefined>();
  const [selectedScope, setSelectedScope] = useState<Scope | undefined>();
  const [year, setYear] = useState<number | undefined>();
  const { mutate: addResume } = usePostResume();

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

        <ResumeUploadForm
          file={file}
          title={title}
          year={year}
          selectedOccupation={selectedOccupation}
          selectedScope={selectedScope}
          onChangeFile={setFile}
          onChangeTitle={setTitle}
          onChangeYear={setYear}
          onChangeSelectedOccupation={setSelectedOccupation}
          onChangeSelectedScope={setSelectedScope}
          onSubmit={addResume}
        />
      </ResumeUploadContainer>
    </PageMain>
  );
};

export default ResumeUpload;
