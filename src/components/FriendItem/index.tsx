import React from 'react';
import { Button } from 'review-me-design-system';
import { ButtonsContainer, FriendItemLayout, UserImg, UserInfo, UserName } from './style';

interface Props {
  type: 'friend' | 'request' | 'response';
  userImg: string;
  userName: string;
}

const FriendItem = ({ type, userImg, userName }: Props) => {
  return (
    <FriendItemLayout>
      <UserInfo>
        <UserImg src={userImg} alt={userName} />
        <UserName>{userName}</UserName>
      </UserInfo>

      {type === 'friend' && (
        <Button variant="outline" size="s">
          삭제
        </Button>
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
