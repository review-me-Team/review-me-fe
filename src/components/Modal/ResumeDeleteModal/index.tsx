import React from 'react';
import { Button, Modal } from 'review-me-design-system';
import { useUserContext } from '@contexts/userContext';
import { useDeleteResume } from '@apis/resumeApi';
import { ButtonsContainer, Description } from './style';

interface Props {
  resumeId: number;
  isOpen: boolean;
  onClose: () => void;
}

const ResumeDeleteModal = ({ resumeId, isOpen, onClose }: Props) => {
  const { jwt } = useUserContext();
  const { mutate: deleteResume } = useDeleteResume();

  return (
    <Modal modalRootId="modal-root" isOpen={isOpen} onClose={onClose} width="18.75rem">
      <Description>
        <Modal.Title>정말로 삭제하시겠습니까?</Modal.Title>
        <Modal.Description>선택한 이력서가 삭제됩니다.</Modal.Description>
      </Description>
      <ButtonsContainer>
        <Button variant="outline" size="m" width="100%" onClick={onClose}>
          취소
        </Button>
        <Button
          variant="default"
          size="m"
          width="100%"
          onClick={() => {
            if (jwt) deleteResume({ resumeId, jwt });
            onClose();
          }}
        >
          삭제
        </Button>
      </ButtonsContainer>
    </Modal>
  );
};

export default ResumeDeleteModal;
