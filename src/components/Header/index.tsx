import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Icon, theme } from 'review-me-design-system';
import useMediaQuery from '@hooks/useMediaQuery';
import { ROUTE_PATH } from '@constants';
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
  const navigate = useNavigate();
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
            <ReviewMe>
              <Link to={ROUTE_PATH.ROOT}>review me</Link>
            </ReviewMe>
            <MenuList>
              <MenuItem>
                <Link to={ROUTE_PATH.RESUME}>이력서</Link>
              </MenuItem>
              <MenuItem>My 이력서</MenuItem>
            </MenuList>
          </RightContainer>
        )}

        <LeftContainer>
          <IconButton
            onClick={() => {
              // * 로그인 된 상태일 경우 마이페이지로 이동
              navigate(ROUTE_PATH.MY_PAGE);
              // todo: 로그인하지 않았을 경우 로그인 유도하는 로직 구현하기
            }}
          >
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
