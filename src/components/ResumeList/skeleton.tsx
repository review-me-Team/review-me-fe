import React from 'react';
import SkeletonResumeItem from '@components/ResumeItem/skeleton';
import { ResumeListLayout } from './style';

const SkeletonResumeList = () => {
  return (
    <ResumeListLayout>
      <SkeletonResumeItem />
      <SkeletonResumeItem />
      <SkeletonResumeItem />
      <SkeletonResumeItem />
      <SkeletonResumeItem />
      <SkeletonResumeItem />
    </ResumeListLayout>
  );
};

export default SkeletonResumeList;
