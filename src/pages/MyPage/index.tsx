import React from 'react';
import { Button, Icon, useModal } from 'review-me-design-system';
import { css } from 'styled-components';
import FollowerModal from '@components/Modal/FollowerModal';
import FollowingModal from '@components/Modal/FollowingModal';
import FriendRequestModal from '@components/Modal/FriendRequestModal';
import FriendSearchModal from '@components/Modal/FriendSearchModal';
import UserItem from '@components/UserItem';
import { useUserContext } from '@contexts/userContext';
import { useFollowerList, useFollowingList, useFriendList } from '@apis/friendApi';
import { PageMain } from '@styles/common';
import { manageBodyScroll } from '@utils';
import {
  FriendSectionContainer,
  FriendSection,
  OpenModalButton,
  Title,
  UserImg,
  UserInfo,
  UserName,
} from './style';

const MyPage = () => {
  const { user, jwt } = useUserContext();

  const { data: friendListData, refetch: refetchFriendList } = useFriendList({ jwt });
  const { data: followingListData, refetch: refetchFollowingList } = useFollowingList({ jwt });
  const { data: followerListData, refetch: refetchFollowerList } = useFollowerList({ jwt });

  const ITEM_COUNT = 2;
  const friendList = friendListData?.pages
    .map((page) => page.users)
    .flat()
    .slice(0, ITEM_COUNT);
  const followingList = followingListData?.pages
    .map((page) => page.users)
    .flat()
    .slice(0, ITEM_COUNT);
  const followerList = followerListData?.pages
    .map((page) => page.users)
    .flat()
    .slice(0, ITEM_COUNT);

  const {
    isOpen: isFriendRequestModalOpen,
    open: openFriendRequestModal,
    close: closeFriendRequestModal,
  } = useModal();
  const {
    isOpen: isFriendSearchModalOpen,
    open: openFriendSearchModal,
    close: closeFriendSearchModal,
  } = useModal();
  const { isOpen: isFollowingModalOpen, open: openFollowingModal, close: closeFollowingModal } = useModal();
  const { isOpen: isFollowerModalOpen, open: openFollowerModal, close: closeFollowerModal } = useModal();

  return (
    <PageMain
      $css={css`
        align-items: center;
      `}
    >
      <UserInfo>
        <UserImg src={user?.avatarUrl} />
        <UserName>{user?.name}</UserName>
      </UserInfo>

      <Button
        variant="default"
        size="l"
        onClick={() => {
          openFriendRequestModal();
          manageBodyScroll(false);
        }}
      >
        친구 추가하기
      </Button>
      <FriendRequestModal
        isOpen={isFriendRequestModalOpen}
        onClose={() => {
          closeFriendRequestModal();
          manageBodyScroll(true);
          refetchFollowingList();
        }}
      />

      <FriendSectionContainer>
        <FriendSection>
          <Title>
            <span>내 친구</span>
            <OpenModalButton
              onClick={() => {
                openFriendSearchModal();
                manageBodyScroll(false);
              }}
            >
              <Icon iconName="rightArrow" />
            </OpenModalButton>
            <FriendSearchModal
              isOpen={isFriendSearchModalOpen}
              onClose={() => {
                closeFriendSearchModal();
                manageBodyScroll(true);
              }}
            />
          </Title>

          <ul>
            {friendList?.map((friend) => (
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
            <OpenModalButton
              onClick={() => {
                openFollowingModal();
                manageBodyScroll(false);
                refetchFollowingList();
              }}
            >
              <Icon iconName="rightArrow" />
            </OpenModalButton>
            <FollowingModal
              isOpen={isFollowingModalOpen}
              onClose={() => {
                closeFollowingModal();
                manageBodyScroll(true);
                refetchFollowingList();
              }}
            />
          </Title>

          <ul>
            {followingList?.map((user) => (
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
            <OpenModalButton
              onClick={() => {
                openFollowerModal();
                manageBodyScroll(false);
              }}
            >
              <Icon iconName="rightArrow" />
            </OpenModalButton>
            <FollowerModal
              isOpen={isFollowerModalOpen}
              onClose={() => {
                closeFollowerModal();
                manageBodyScroll(true);
                refetchFollowerList();
                refetchFriendList();
              }}
            />
          </Title>

          <ul>
            {followerList?.map((user) => (
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
