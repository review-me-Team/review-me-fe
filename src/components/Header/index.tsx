import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Icon, theme } from 'review-me-design-system';
import useMediaQuery from '@hooks/useMediaQuery';
import { ROUTE_PATH } from '@constants';
import { manageBodyScroll } from '@utils';
import {
  HeaderLayout,
  LeftContainer,
  MenuItem,
  MenuList,
  NavContainer,
  ReviewMe,
  RightContainer,
  IconButton,
  MobileMenu,
  MobileMenuList,
  MobileMenuItem,
  JoinUsMessage,
  MobileMenuTop,
  MobileMenuButtonContainer,
  BackDrop,
} from './style';

const Header = () => {
  const navigate = useNavigate();
  const { matches: isSMDevice } = useMediaQuery({ mediaQueryString: '(max-width: 600px)' });
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);

  const handleOpenMobileMenu = () => {
    if (!isSMDevice) return;

    setIsOpenMobileMenu(true);
    manageBodyScroll(false);
  };

  const handleCloseMobileMenu = () => {
    if (!isSMDevice) return;

    setIsOpenMobileMenu(false);
    manageBodyScroll(true);
  };

  const CLIENT_ID = process.env.DEV_CLIENT_ID;
  const REDIRECT_URI = process.env.DEV_REDIRECT_URI;
  const GITHUB_OAUTH_URI = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

  const handleLogin = () => {
    window.location.assign(GITHUB_OAUTH_URI);
  };

  return (
    <HeaderLayout>
      <NavContainer>
        {isSMDevice && (
          <>
            <IconButton onClick={handleOpenMobileMenu}>
              <Icon iconName="menu" color={theme.color.accent.text.strong} width={28} height={28} />
            </IconButton>
            <MobileMenu className={isOpenMobileMenu ? 'open' : ''}>
              <MobileMenuTop>
                <IconButton onClick={handleCloseMobileMenu}>
                  <Icon iconName="xMark" width={28} height={28} />
                </IconButton>
              </MobileMenuTop>

              <MobileMenuList>
                <MobileMenuItem
                  onClick={() => {
                    handleCloseMobileMenu();
                    navigate(ROUTE_PATH.RESUME);
                  }}
                >
                  <span>이력서 보러가기</span>
                  <Icon iconName="rightArrow" width={28} height={28} />
                </MobileMenuItem>
              </MobileMenuList>

              <JoinUsMessage>
                <span>review me에 가입하여</span>
                <span>다른 사람들과 이력서를 공유해보세요.</span>
              </JoinUsMessage>

              <MobileMenuButtonContainer>
                <Button variant="default" size="s">
                  회원 가입
                </Button>
                <Button variant="outline" size="s" onClick={handleLogin}>
                  github으로 로그인
                </Button>
              </MobileMenuButtonContainer>
            </MobileMenu>
            {isOpenMobileMenu && <BackDrop onClick={handleCloseMobileMenu} />}
          </>
        )}
        {!isSMDevice && (
          <LeftContainer>
            <ReviewMe>
              <Link to={ROUTE_PATH.ROOT}>review me</Link>
            </ReviewMe>
            <MenuList>
              <MenuItem>
                <Link to={ROUTE_PATH.RESUME}>이력서</Link>
              </MenuItem>
              <MenuItem>My 이력서</MenuItem>
            </MenuList>
          </LeftContainer>
        )}

        <RightContainer>
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
            <Button variant="default" size="s" onClick={handleLogin}>
              로그인
            </Button>
          )}
        </RightContainer>
      </NavContainer>
    </HeaderLayout>
  );
};

export default Header;
