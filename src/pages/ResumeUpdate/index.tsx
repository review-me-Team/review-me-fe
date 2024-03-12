import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from 'review-me-design-system';
import ResumeUpdateForm from '@components/ResumeForm/ResumeUpdateForm';
import { useUserContext } from '@contexts/userContext';
import { useResumeDetail, useUpdateResume } from '@apis/resumeApi';
import { Occupation, Scope, useOccupationList, useScopeList } from '@apis/utilApi';
import { PageMain } from '@styles/common';
import { ResumeUploadContainer, IconButton, Description, MainDescription } from './style';

interface Location {
  state: { resumeId: number; title: string; year: number; occupation: string; scope: string };
}

const ResumeUpdate = () => {
  const {
    state: { resumeId, title: prevTitle, year: prevYear, occupation: prevOccupation, scope: prevScope },
  } = useLocation() as Location;
  const { jwt } = useUserContext();

  const navigate = useNavigate();

  const { data: resumeDetail } = useResumeDetail({ resumeId, jwt });
  const { data: occupationList } = useOccupationList();
  const { data: scopeList } = useScopeList();

  const file = resumeDetail?.resumeUrl;

  const prevOccupationState = occupationList?.find(({ occupation }) => occupation === prevOccupation);
  const prevScopeState = scopeList?.find(({ scope }) => scope === prevScope);

  const [title, setTitle] = useState<string>(prevTitle);
  const [selectedOccupation, setSelectedOccupation] = useState<Occupation | undefined>(prevOccupationState);
  const [selectedScope, setSelectedScope] = useState<Scope | undefined>(prevScopeState);
  const [year, setYear] = useState<number | undefined>(prevYear);

  const { mutate: updateResume } = useUpdateResume();

  return (
    <PageMain>
      <IconButton onClick={() => navigate(-1)}>
        <Icon iconName="leftArrow" />
        <span>뒤로</span>
      </IconButton>

      <ResumeUploadContainer>
        <Description>
          <MainDescription>이력서 수정</MainDescription>
        </Description>

        <ResumeUpdateForm
          resumeId={resumeId}
          file={file}
          title={title}
          year={year}
          selectedOccupation={selectedOccupation}
          selectedScope={selectedScope}
          onChangeTitle={setTitle}
          onChangeYear={setYear}
          onChangeSelectedOccupation={setSelectedOccupation}
          onChangeSelectedScope={setSelectedScope}
          onSubmit={updateResume}
        />
      </ResumeUploadContainer>
    </PageMain>
  );
};

export default ResumeUpdate;
