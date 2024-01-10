import React from 'react';
import { Button, ButtonsContainer, DescriptionContainer, MyResumeItemLayout, Title } from './style';

interface Props {
  title: string;
  year: number;
  occupation: string;
  scope: string;
  createdAt: string;
}

const MyResumeItem = ({ title, year, occupation, scope, createdAt }: Props) => {
  const dateObj = new Date(createdAt);
  const formattedDate = `
    ${dateObj.getFullYear()}.${(dateObj.getMonth() + 1).toString().padStart(2, '0')}.${dateObj
      .getDate()
      .toString()
      .padStart(2, '0')}
  `;

  return (
    <MyResumeItemLayout>
      <Title>{title}</Title>
      <DescriptionContainer>
        <span>직군: {occupation}</span>
        <span>경력: {year > 0 ? `${year}년차` : '신입'}</span>
        <span>{scope}</span>
        <span>{formattedDate}</span>
      </DescriptionContainer>
      <ButtonsContainer>
        <Button position="left">수정</Button>
        <Button position="right">삭제</Button>
      </ButtonsContainer>
    </MyResumeItemLayout>
  );
};

export default MyResumeItem;
