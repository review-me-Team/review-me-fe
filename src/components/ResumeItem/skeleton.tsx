import React from 'react';
import { SkeletonBox, SkeletonUserImg } from '@styles/skeleton';
import { SkeletonResumeItemLayout, User } from './style';

const SkeletonResumeItem = () => {
  return (
    <SkeletonResumeItemLayout>
      <SkeletonBox $height="2rem" />
      <User>
        <SkeletonUserImg $width="2.25rem" $height="2.25rem" />
        <SkeletonBox $width="50%" $height="1.75rem" />
      </User>
      <SkeletonBox $height="3.5rem" />
      <SkeletonBox $height="1.75rem" />
    </SkeletonResumeItemLayout>
  );
};

export default SkeletonResumeItem;
