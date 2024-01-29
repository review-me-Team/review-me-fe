import React from 'react';
import { Button, Icon, theme } from 'review-me-design-system';
import useMediaQuery from '@hooks/useMediaQuery';
import {
  HeaderLayout,
  LeftContainer,
  MenuItem,
  MenuList,
  NavContainer,
  ReviewMe,
  RightContainer,
  IconButton,
} from './style';

const Header = () => {
  const { matches: isSMDevice } = useMediaQuery({ mediaQueryString: '(max-width: 600px)' });

  return (
    <HeaderLayout>
      <NavContainer>
        {isSMDevice && (
          <IconButton>
            <Icon iconName="menu" color={theme.color.accent.text.strong} width={32} height={32} />
          </IconButton>
        )}
        {!isSMDevice && (
          <RightContainer>
            <ReviewMe>review me</ReviewMe>
            <MenuList>
              <MenuItem>이력서</MenuItem>
              <MenuItem>My 이력서</MenuItem>
            </MenuList>
          </RightContainer>
        )}

        <LeftContainer>
          <IconButton>
            <Icon iconName="person" color={theme.color.accent.text.strong} width={32} height={32} />
          </IconButton>
          {!isSMDevice && (
            <Button variant="default" size="s">
              로그아웃
            </Button>
          )}
        </LeftContainer>
      </NavContainer>
    </HeaderLayout>
  );
};

export default Header;
