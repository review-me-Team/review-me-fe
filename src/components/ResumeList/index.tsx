import React from 'react';
import ResumeItem from '@components/ResumeItem';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useUserContext } from '@contexts/userContext';
import { useResumeList } from '@apis/resumeApi';
import { ResumeListLayout } from './style';

interface Props {
  occupationId?: number;
  startYear: number;
  endYear: number;
}

const ResumeList = ({ occupationId, startYear, endYear }: Props) => {
  const { jwt } = useUserContext();
  const { data: resumeListData, fetchNextPage } = useResumeList({
    jwt,
    occupationId,
    startYear,
    endYear,
  });

  const resumeList = resumeListData?.pages.flatMap((page) => page.resumes);

  const { setTarget } = useIntersectionObserver({
    onIntersect: () => fetchNextPage(),
    options: {
      threshold: 0.5,
    },
  });

  return (
    <>
      <ResumeListLayout>
        {resumeList?.map((resume) => {
          return (
            <li key={resume.id}>
              <ResumeItem {...resume} />
            </li>
          );
        })}
      </ResumeListLayout>
      <div ref={setTarget}></div>
    </>
  );
};

export default ResumeList;
