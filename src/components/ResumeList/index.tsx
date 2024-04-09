import React from 'react';
import ResumeItem from '@components/ResumeItem';
import Spinner from '@components/Spinner';
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
  const {
    data: resumeList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useResumeList({
    jwt,
    occupationId,
    startYear,
    endYear,
  });

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
      {hasNextPage && !isFetchingNextPage && <div ref={setTarget}></div>}
      {isFetchingNextPage && <Spinner size="4rem" />}
    </>
  );
};

export default ResumeList;
