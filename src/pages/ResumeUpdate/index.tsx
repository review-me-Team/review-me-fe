import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from 'review-me-design-system';
import ResumeUpdateForm from '@components/ResumeForm/ResumeUpdateForm';
import { useUserContext } from '@contexts/userContext';
import { useResumeDetail } from '@apis/resumeApi';
import { useOccupationList, useScopeList } from '@apis/utilApi';
import { PageMain } from '@styles/common';
import { ResumeUploadContainer, IconButton, Description, MainDescription, SubDescription } from './style';

const ResumeUpdate = () => {
  const { resumeId } = useParams();
  const { jwt } = useUserContext();

  const navigate = useNavigate();

  const { data: resumeDetail } = useResumeDetail({ resumeId: Number(resumeId), jwt });
  const { data: occupationList } = useOccupationList();
  const { data: scopeList } = useScopeList();

  const initOccupationId = occupationList?.find(({ occupation }) => occupation === resumeDetail?.occupation)
    ?.id;
  const initScopeId = scopeList?.find(({ scope }) => scope === resumeDetail?.scope)?.id;

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

        {resumeDetail && initOccupationId && initScopeId && (
          <ResumeUpdateForm
            resumeId={Number(resumeId)}
            file={resumeDetail.resumeUrl}
            initTitle={resumeDetail.title}
            initOccupationId={initOccupationId}
            initScopeId={initScopeId}
            initYear={resumeDetail.year}
          />
        )}
      </ResumeUploadContainer>
    </PageMain>
  );
};

export default ResumeUpdate;
