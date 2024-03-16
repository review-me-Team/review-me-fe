import React from 'react';
import { ROUTE_PATH } from '@constants';
import { formatDate } from '@utils';
import { CreatedAt, ResumeItemLayout, Title, User, UserImg, UserInfo } from './style';

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
    <ResumeItemLayout to={`${ROUTE_PATH.RESUME}/${id}`}>
      <Title>{title}</Title>
      <User>
        <UserImg src={writerProfileUrl} alt="user-image" />
        <span>{writerName}</span>
      </User>
      <UserInfo>
        <span>직군: {occupation}</span>
        <span>경력: {year === 0 ? '신입' : `${year}년차`}</span>
      </UserInfo>
      <CreatedAt>{formatDate(createdAt)}</CreatedAt>
    </ResumeItemLayout>
  );
};

export default ResumeItem;
