import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useModal } from 'review-me-design-system';
import ResumeDeleteModal from '@components/Modal/ResumeDeleteModal';
import { ROUTE_PATH } from '@constants';
import { formatDate } from '@utils';
import {
  Button,
  ButtonsContainer,
  Occupation,
  DescriptionContainer,
  MyResumeItemLayout,
  Title,
  Scope,
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
  const { isOpen: isOpenDeleteModal, open: openDeleteModal, close: closeDeleteModal } = useModal();
  const navigate = useNavigate();

  return (
    <MyResumeItemLayout>
      <Link to={`${ROUTE_PATH.RESUME}/${id}`}>
        <Title>{title}</Title>
        <DescriptionContainer>
          <Scope>{scope}</Scope>
          <Occupation>직군: {occupation}</Occupation>
          <span>경력: {year > 0 ? `${year}년차` : '신입'}</span>
          <span>{formatDate(createdAt)}</span>
        </DescriptionContainer>
      </Link>
      <ButtonsContainer>
        <Button
          $position="left"
          onClick={() => {
            navigate(ROUTE_PATH.RESUME_UPDATE, { state: { resumeId: id, title, year, occupation, scope } });
          }}
        >
          수정
        </Button>
        <Button $position="right" onClick={openDeleteModal}>
          삭제
        </Button>
      </ButtonsContainer>

      <ResumeDeleteModal isOpen={isOpenDeleteModal} onClose={closeDeleteModal} resumeId={id} />
    </MyResumeItemLayout>
  );
};

export default MyResumeItem;
