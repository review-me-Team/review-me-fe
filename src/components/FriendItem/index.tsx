import React, { useState } from 'react';
import { Button, useModal } from 'review-me-design-system';
import FriendDeleteModal from '@components/Modal/FriendDeleteModal';
import { useUserContext } from '@contexts/userContext';
import { useDeleteFriendRequest, usePatchFriendRequest, usePostFriendRequest } from '@apis/friendApi';
import { manageBodyScroll } from '@utils';
import { ButtonsContainer, FriendItemLayout, UserImg, UserInfo, UserName } from './style';

type Type = 'friend' | 'request' | 'response' | 'none';

interface Props {
  type: Type;
  userId: number;
  userImg: string;
  userName: string;
}

const FriendItem = ({ type: initType, userId, userImg, userName }: Props) => {
  const { jwt } = useUserContext();

  const [type, setType] = useState<Type>(initType);

  const {
    isOpen: isFriendDeleteModalOpen,
    open: openFriendDeleteModal,
    close: closeFriendDeleteModal,
  } = useModal();
  const { mutate: requestFriend } = usePostFriendRequest();
  const { mutate: cancelFriendRequest } = useDeleteFriendRequest();
  const { mutate: acceptFriendRequest } = usePatchFriendRequest();

  return (
    <FriendItemLayout>
      <UserInfo>
        <UserImg src={userImg} alt={userName} />
        <UserName>{userName}</UserName>
      </UserInfo>

      {type === 'none' && (
        <Button
          variant="default"
          size="s"
          onClick={() => {
            if (jwt) requestFriend({ userId, jwt });
            setType('request');
          }}
        >
          친구 요청
        </Button>
      )}
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
        <Button
          variant="outline"
          size="s"
          onClick={() => {
            if (jwt) cancelFriendRequest({ userId, jwt });
            setType('none');
          }}
        >
          요청 취소
        </Button>
      )}
      {type === 'response' && (
        <ButtonsContainer>
          <Button
            variant="default"
            size="s"
            onClick={() => {
              if (jwt) acceptFriendRequest({ userId, jwt });
              setType('friend');
            }}
          >
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
