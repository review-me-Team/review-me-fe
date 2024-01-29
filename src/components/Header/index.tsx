import React from 'react';
import { Button, Icon, theme } from 'review-me-design-system';
import {
  HeaderLayout,
  LeftContainer,
  MenuItem,
  MenuList,
  NavContainer,
  ReviewMe,
  RightContainer,
  UserInfoButton,
} from './style';

const Header = () => {
  return (
    <HeaderLayout>
      <NavContainer>
        <RightContainer>
          <ReviewMe>review me</ReviewMe>
          <MenuList>
            <MenuItem>이력서</MenuItem>
            <MenuItem>My 이력서</MenuItem>
          </MenuList>
        </RightContainer>

        <LeftContainer>
          <UserInfoButton>
            <Icon iconName="person" color={theme.color.accent.text.strong} width={32} height={32} />
          </UserInfoButton>
          <Button variant="default" size="s">
            로그아웃
          </Button>
        </LeftContainer>
      </NavContainer>
    </HeaderLayout>
  );
};

export default Header;
