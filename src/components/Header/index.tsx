import React, { useState } from 'react';
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
  MobileMenu,
  MobileMenuList,
  MobileMenuItem,
  JoinUsMessage,
  MobileMenuTop,
  MobileMenuButtonContainer,
} from './style';

const Header = () => {
  const navigate = useNavigate();
  const { matches: isSMDevice } = useMediaQuery({ mediaQueryString: '(max-width: 600px)' });
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);

  return (
    <HeaderLayout>
      <NavContainer>
        {isSMDevice && (
          <>
            <IconButton onClick={() => setIsOpenMobileMenu(true)}>
              <Icon iconName="menu" color={theme.color.accent.text.strong} width={28} height={28} />
            </IconButton>
            <MobileMenu className={isOpenMobileMenu ? 'open' : ''}>
              <MobileMenuTop>
                <IconButton onClick={() => setIsOpenMobileMenu(false)}>
                  <Icon iconName="xMark" width={28} height={28} />
                </IconButton>
              </MobileMenuTop>

              <MobileMenuList>
                <MobileMenuItem
                  onClick={() => {
                    setIsOpenMobileMenu(false);
                    navigate(ROUTE_PATH.RESUME);
                  }}
                >
                  <span>이력서 보러가기</span>
                  <Icon iconName="rightArrow" width={28} height={28} />
                </MobileMenuItem>
                <MobileMenuItem
                  onClick={() => {
                    setIsOpenMobileMenu(false);
                    navigate(ROUTE_PATH.MY_RESUME);
                  }}
                >
                  <span>My 이력서 보러가기</span>
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
                <Button variant="outline" size="s">
                  github으로 로그인
                </Button>
              </MobileMenuButtonContainer>
            </MobileMenu>
          </>
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
