import React from 'react';
import { formatDate } from '@utils';
import { ResumeItemLayout, Title, User, UserImg, UserInfo } from './style';

interface Props {
  id: number;
  title: string;
  writerName: string;
  writerProfileUrl: string;
  createdAt: string;
  occupation: string;
  year: number;
}

const ResumeItem = ({ id, title, writerName, writerProfileUrl, createdAt, occupation, year }: Props) => {
  return (
    <ResumeItemLayout>
      <Title>{title}</Title>
      <User>
        <UserImg src={writerProfileUrl} alt="user-image" />
        <span>{writerName}</span>
      </User>
      <UserInfo>
        <span>직군: {occupation}</span>
        <span>경력: {year === 0 ? '신입' : `${year}년차`}</span>
      </UserInfo>
      <span>{formatDate(createdAt)}</span>
    </ResumeItemLayout>
  );
};

export default ResumeItem;
