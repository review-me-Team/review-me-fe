import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from 'review-me-design-system';
import ResumeUpdateForm from '@components/ResumeForm/ResumeUpdateForm';
import { useUserContext } from '@contexts/userContext';
import { useResumeDetail } from '@apis/resumeApi';
import { PageMain } from '@styles/common';
import { ResumeUploadContainer, IconButton, Description, MainDescription, SubDescription } from './style';

interface Location {
  state: { resumeId: number; title: string; year: number; occupation: string; scope: string };
}

const ResumeUpdate = () => {
  const {
    state: { resumeId, title: initTitle, year: initYear, occupation: initOccupation, scope: initScope },
  } = useLocation() as Location;
  const { jwt } = useUserContext();

  const navigate = useNavigate();

  const { data: resumeDetail } = useResumeDetail({ resumeId, jwt });

  const file = resumeDetail?.resumeUrl;

  return (
    <PageMain>
      <IconButton onClick={() => navigate(-1)}>
        <Icon iconName="leftArrow" />
        <span>뒤로</span>
      </IconButton>

      <ResumeUploadContainer>
        <Description>
          <MainDescription>이력서 수정</MainDescription>
          <SubDescription>아래의 양식을 작성하고 수정하기 버튼을 눌러주세요.</SubDescription>
        </Description>

        <ResumeUpdateForm
          resumeId={resumeId}
          file={file}
          initTitle={initTitle}
          initOccupation={initOccupation}
          initScope={initScope}
          initYear={initYear}
        />
      </ResumeUploadContainer>
    </PageMain>
  );
};

export default ResumeUpdate;
