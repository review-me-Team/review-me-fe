import React from 'react';
import { useModal } from 'review-me-design-system';
import ResumeDeleteModal from '@components/Modal/ResumeDeleteModal';
import {
  Button,
  ButtonsContainer,
  Occupation,
  DescriptionContainer,
  MyResumeItemLayout,
  Title,
} from './style';

interface Props {
  id: number;
  title: string;
  year: number;
  occupation: string;
  scope: string;
  createdAt: string;
}

const MyResumeItem = ({ id, title, year, occupation, scope, createdAt }: Props) => {
  const dateObj = new Date(createdAt);
  const formattedDate = `
    ${dateObj.getFullYear()}.${(dateObj.getMonth() + 1).toString().padStart(2, '0')}.${dateObj
      .getDate()
      .toString()
      .padStart(2, '0')}
  `;
  const { isOpen: isOpenDeleteModal, open: openDeleteModal, close: closeDeleteModal } = useModal();

  return (
    <MyResumeItemLayout>
      <Title>{title}</Title>
      <DescriptionContainer>
        <Occupation>직군: {occupation}</Occupation>
        <span>경력: {year > 0 ? `${year}년차` : '신입'}</span>
        <span>{scope}</span>
        <span>{formattedDate}</span>
      </DescriptionContainer>
      <ButtonsContainer>
        <Button position="left">수정</Button>
        <Button position="right" onClick={openDeleteModal}>
          삭제
        </Button>
      </ButtonsContainer>

      <ResumeDeleteModal isOpen={isOpenDeleteModal} onClose={closeDeleteModal} resumeId={id} />
    </MyResumeItemLayout>
  );
};

export default MyResumeItem;
