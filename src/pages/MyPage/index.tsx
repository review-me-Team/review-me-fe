import React from 'react';
import { Button, Icon } from 'review-me-design-system';
import { css } from 'styled-components';
import FriendItem from '@components/FriendItem';
import { useUserContext } from '@contexts/userContext';
import { PageMain } from '@styles/common';
import {
  FriendSectionContainer,
  FriendSection,
  NavigationButton,
  Title,
  UserImg,
  UserInfo,
  UserName,
} from './style';

const MyPage = () => {
  const { user } = useUserContext();

  return (
    <PageMain
      css={css`
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
            <NavigationButton>
              <Icon iconName="rightArrow" />
            </NavigationButton>
          </Title>

          <ul>
            <FriendItem type="friend" userImg="" userName="김가나" />
            <FriendItem type="friend" userImg="" userName="김가나" />
          </ul>
        </FriendSection>

        <FriendSection>
          <Title>
            <span>내가 친구 요청 보낸 사람</span>
            <NavigationButton>
              <Icon iconName="rightArrow" />
            </NavigationButton>
          </Title>

          <ul>
            <FriendItem type="request" userImg="" userName="김가나" />
            <FriendItem type="request" userImg="" userName="김가나" />
          </ul>
        </FriendSection>

        <FriendSection>
          <Title>
            <span>나에게 친구 요청 보낸 사람</span>
            <NavigationButton>
              <Icon iconName="rightArrow" />
            </NavigationButton>
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
