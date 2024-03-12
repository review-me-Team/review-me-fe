import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'review-me-design-system';
import MyResumeItem from '@components/MyResumeItem';
import { useUserContext } from '@contexts/userContext';
import { useMyResumeList } from '@apis/resumeApi';
import { ROUTE_PATH } from '@constants';
import { Main, MyResumeList } from './style';

const MyResume = () => {
  const navigate = useNavigate();
  const { jwt } = useUserContext();

  const { data: myResumeListData } = useMyResumeList({ jwt });

  const myResumeList = myResumeListData?.pages.map((page) => page.resumes).flat() ?? [];

  return (
    <Main>
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
    </Main>
  );
};

export default MyResume;
