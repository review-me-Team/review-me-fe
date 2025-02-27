import React from 'react';
import { Button, Icon } from 'review-me-design-system';
import { css } from 'styled-components';
import FollowerModal from '@components/Modal/FollowerModal';
import FollowingModal from '@components/Modal/FollowingModal';
import FriendRequestModal from '@components/Modal/FriendRequestModal';
import FriendSearchModal from '@components/Modal/FriendSearchModal';
import UserItem from '@components/UserItem';
import useModals from '@hooks/useModals';
import { useUserContext } from '@contexts/userContext';
import { useFollowerList, useFollowingList, useFriendList } from '@apis/friendApi';
import { PageMain } from '@styles/common';
import { IconButton } from '@styles/iconButton';
import { FriendSectionContainer, FriendSection, Title, UserImg, UserInfo, UserName } from './style';

const MyPage = () => {
  const { user, jwt } = useUserContext();

  const { data: friendList, refetch: refetchFriendList } = useFriendList({ jwt });
  const { data: followingList, refetch: refetchFollowingList } = useFollowingList({ jwt });
  const { data: followerList, refetch: refetchFollowerList } = useFollowerList({ jwt });

  const ITEM_COUNT = 2;

  const { open } = useModals();

  return (
    <PageMain
      $css={css`
        align-items: center;
      `}
    >
      <UserInfo>
        <UserImg src={user?.avatarUrl} alt={user?.name} />
        <UserName>{user?.name}</UserName>
      </UserInfo>

      <Button
        variant="default"
        size="l"
        onClick={() => {
          open(({ isOpen, onClose }) => (
            <FriendRequestModal
              isOpen={isOpen}
              onClose={() => {
                refetchFriendList();
                refetchFollowingList();
                refetchFollowerList();
                onClose();
              }}
            />
          ));
        }}
      >
        친구 추가하기
      </Button>

      <FriendSectionContainer>
        <FriendSection>
          <Title>
            <span>내 친구</span>
            <IconButton
              aria-label="친구 모달 열기"
              onClick={() => {
                open(({ isOpen, onClose }) => <FriendSearchModal isOpen={isOpen} onClose={onClose} />);
              }}
            >
              <Icon iconName="rightArrow" />
            </IconButton>
          </Title>

          <ul>
            {(friendList || [])
              ?.slice(0, ITEM_COUNT)
              .map((friend) => (
                <UserItem
                  type="friend"
                  key={friend.id}
                  userId={friend.id}
                  userName={friend.name}
                  userImg={friend.profileUrl}
                />
              ))}
          </ul>
        </FriendSection>

        <FriendSection>
          <Title>
            <span>전송한 친구 요청 보기</span>
            <IconButton
              aria-label="전송한 친구 요청 보기 모달 열기"
              onClick={() => {
                open(({ isOpen, onClose }) => (
                  <FollowingModal
                    isOpen={isOpen}
                    onClose={() => {
                      refetchFriendList();
                      onClose();
                    }}
                  />
                ));

                refetchFollowingList();
              }}
            >
              <Icon iconName="rightArrow" />
            </IconButton>
          </Title>

          <ul>
            {followingList
              ?.slice(0, ITEM_COUNT)
              .map((user) => (
                <UserItem
                  key={user.id}
                  type="following"
                  userId={user.id}
                  userName={user.name}
                  userImg={user.profileUrl}
                />
              ))}
          </ul>
        </FriendSection>

        <FriendSection>
          <Title>
            <span>친구 요청에 응답하기</span>
            <IconButton
              aria-label="친구 요청에 응답하기 모달 열기"
              onClick={() => {
                open(({ isOpen, onClose }) => (
                  <FollowerModal
                    isOpen={isOpen}
                    onClose={() => {
                      refetchFollowerList();
                      refetchFriendList();
                      onClose();
                    }}
                  />
                ));
              }}
            >
              <Icon iconName="rightArrow" />
            </IconButton>
          </Title>

          <ul>
            {followerList
              ?.slice(0, ITEM_COUNT)
              .map((user) => (
                <UserItem
                  key={user.id}
                  type="follower"
                  userId={user.id}
                  userName={user.name}
                  userImg={user.profileUrl}
                />
              ))}
          </ul>
        </FriendSection>
      </FriendSectionContainer>
    </PageMain>
  );
};

export default MyPage;
