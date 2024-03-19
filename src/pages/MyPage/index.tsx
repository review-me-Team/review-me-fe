import React from 'react';
import { Button, Icon, useModal } from 'review-me-design-system';
import { css } from 'styled-components';
import FriendItem from '@components/FriendItem';
import FollowingModal from '@components/Modal/FollowingModal';
import FriendRequestModal from '@components/Modal/FriendRequestModal';
import FriendSearchModal from '@components/Modal/FriendSearchModal';
import { useUserContext } from '@contexts/userContext';
import { useFollowingList, useFriendList } from '@apis/friendApi';
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
  const SIZE = 7;
  const { user, jwt } = useUserContext();

  const { data: friendListData } = useFriendList({ jwt, size: SIZE });
  const { data: followingListData, refetch: refetchFollowingList } = useFollowingList({ jwt, size: SIZE });

  const ITEM_COUNT = 2;
  const friendList = friendListData?.pages
    .map((page) => page.users)
    .flat()
    .slice(0, ITEM_COUNT);
  const followingList = followingListData?.pages
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
              <FriendItem
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
              <FriendItem
                key={user.id}
                type="request"
                userId={user.id}
                userName={user.name}
                userImg={user.profileUrl}
              />
            ))}
          </ul>
        </FriendSection>

        <FriendSection>
          <Title>
            <span>나에게 친구 요청 보낸 사람</span>
            <OpenModalButton>
              <Icon iconName="rightArrow" />
            </OpenModalButton>
          </Title>

          <ul>
            <FriendItem type="response" userId={3} userImg="" userName="김가나" />
            <FriendItem type="response" userId={4} userImg="" userName="김가나" />
          </ul>
        </FriendSection>
      </FriendSectionContainer>
    </PageMain>
  );
};

export default MyPage;
