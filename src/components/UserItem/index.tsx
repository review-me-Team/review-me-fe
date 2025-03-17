import { useState } from 'react';
import { Button } from 'review-me-design-system';
import FriendDeleteModal from '@components/Modal/FriendDeleteModal';
import useModals from '@hooks/useModals';
import { useUserContext } from '@contexts/userContext';
import {
  useDeleteFriendRequest,
  useAcceptFriendRequest,
  usePostFriendRequest,
  useRejectFriendRequest,
} from '@apis/friendApi';
import { ButtonsContainer, UserItemLayout, UserImg, UserInfo, UserName } from './style';

type Type = 'friend' | 'following' | 'follower' | 'none';

interface Props {
  type: Type;
  userId: number;
  userImg: string;
  userName: string;
}

const UserItem = ({ type: initType, userId, userImg, userName }: Props) => {
  const { jwt } = useUserContext();

  const [type, setType] = useState<Type>(initType);

  const { open } = useModals();

  const { mutate: requestFriend } = usePostFriendRequest();
  const { mutate: cancelFriendRequest } = useDeleteFriendRequest();
  const { mutate: acceptFriendRequest } = useAcceptFriendRequest();
  const { mutate: rejectFriendRequest } = useRejectFriendRequest();

  return (
    <UserItemLayout>
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
            setType('following');
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
              open(({ isOpen, onClose }) => (
                <FriendDeleteModal friendId={userId} isOpen={isOpen} onClose={onClose} />
              ));
            }}
          >
            삭제
          </Button>
        </>
      )}
      {type === 'following' && (
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
      {type === 'follower' && (
        <ButtonsContainer>
          <Button
            variant="default"
            size="s"
            onClick={() => {
              if (jwt) acceptFriendRequest({ userId, jwt });
            }}
          >
            수락
          </Button>
          <Button
            variant="outline"
            size="s"
            onClick={() => {
              if (jwt) rejectFriendRequest({ userId, jwt });
            }}
          >
            거절
          </Button>
        </ButtonsContainer>
      )}
    </UserItemLayout>
  );
};

export default UserItem;
