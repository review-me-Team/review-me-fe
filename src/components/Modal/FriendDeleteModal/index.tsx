import React from 'react';
import { Button, Modal } from 'review-me-design-system';
import { useUserContext } from '@contexts/userContext';
import { useDeleteFriend } from '@apis/friendApi';
import { ButtonsContainer, Description } from './style';

interface Props {
  friendId: number;
  isOpen: boolean;
  onClose: () => void;
}

const FriendDeleteModal = ({ friendId, isOpen, onClose }: Props) => {
  const { jwt } = useUserContext();
  const { mutate: deleteFriend } = useDeleteFriend();

  return (
    <Modal modalRootId="modal-root" isOpen={isOpen} onClose={onClose} width="18.75rem">
      <Description>
        <Modal.Title>정말로 친구를 삭제하시겠습니까?</Modal.Title>
        <Modal.Description>선택한 친구가 삭제됩니다.</Modal.Description>
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
            if (jwt) deleteFriend({ friendId, jwt });
            onClose();
          }}
        >
          삭제
        </Button>
      </ButtonsContainer>
    </Modal>
  );
};

export default FriendDeleteModal;
