import React from 'react';
import { Button, Icon, useModal } from 'review-me-design-system';
import { css } from 'styled-components';
import FriendItem from '@components/FriendItem';
import FriendSearchModal from '@components/Modal/FriendSearchModal';
import { useUserContext } from '@contexts/userContext';
import { useFriendList } from '@apis/friendApi';
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
  const SIZE = 2;
  const { user, jwt } = useUserContext();

  const { data: friendListData } = useFriendList({ jwt, size: SIZE });

  const friendList = friendListData?.pages.map((page) => page.users).flat();

  const {
    isOpen: isFriendSearchModalOpen,
    open: openFriendSearchModal,
    close: closeFriendSearchModal,
  } = useModal();

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

      <Button variant="default" size="l">
        친구 추가하기
      </Button>

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
              <FriendItem type="friend" key={friend.id} userName={friend.name} userImg={friend.profileUrl} />
            ))}
          </ul>
        </FriendSection>

        <FriendSection>
          <Title>
            <span>내가 친구 요청 보낸 사람</span>
            <OpenModalButton>
              <Icon iconName="rightArrow" />
            </OpenModalButton>
          </Title>

          <ul>
            <FriendItem type="request" userImg="" userName="김가나" />
            <FriendItem type="request" userImg="" userName="김가나" />
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
            <FriendItem type="response" userImg="" userName="김가나" />
            <FriendItem type="response" userImg="" userName="김가나" />
          </ul>
        </FriendSection>
      </FriendSectionContainer>
    </PageMain>
  );
};

export default MyPage;
