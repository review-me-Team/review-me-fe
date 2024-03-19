import React from 'react';
import { Button, useModal } from 'review-me-design-system';
import FriendDeleteModal from '@components/Modal/FriendDeleteModal';
import { manageBodyScroll } from '@utils';
import { ButtonsContainer, FriendItemLayout, UserImg, UserInfo, UserName } from './style';

interface Props {
  type: 'friend' | 'request' | 'response';
  userId: number;
  userImg: string;
  userName: string;
}

const FriendItem = ({ type, userId, userImg, userName }: Props) => {
  const {
    isOpen: isFriendDeleteModalOpen,
    open: openFriendDeleteModal,
    close: closeFriendDeleteModal,
  } = useModal();

  return (
    <FriendItemLayout>
      <UserInfo>
        <UserImg src={userImg} alt={userName} />
        <UserName>{userName}</UserName>
      </UserInfo>

      {type === 'friend' && (
        <>
          <Button
            variant="outline"
            size="s"
            onClick={() => {
              openFriendDeleteModal();
              manageBodyScroll(false);
            }}
          >
            삭제
          </Button>
          <FriendDeleteModal
            friendId={userId}
            isOpen={isFriendDeleteModalOpen}
            onClose={() => {
              closeFriendDeleteModal();
              manageBodyScroll(true);
            }}
          />
        </>
      )}
      {type === 'request' && (
        <Button variant="outline" size="s">
          요청 취소
        </Button>
      )}
      {type === 'response' && (
        <ButtonsContainer>
          <Button variant="default" size="s">
            수락
          </Button>
          <Button variant="outline" size="s">
            거절
          </Button>
        </ButtonsContainer>
      )}
    </FriendItemLayout>
  );
};

export default FriendItem;
