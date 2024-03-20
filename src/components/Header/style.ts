import { theme } from 'review-me-design-system';
import styled from 'styled-components';
import { breakPoints } from '@styles/common';

const HeaderLayout = styled.header`
  width: 100%;
  height: 3.75rem;
  padding: 0 2rem;

  background: ${theme.color.neutral.bg.default};
  border-bottom: 1px solid ${theme.palette.gray300};

  @media ${breakPoints.mobile} {
    padding: 0 0.5rem;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4.5rem;
  height: 100%;
`;

const ReviewMe = styled.span`
  color: ${theme.color.accent.text.strong};
  ${theme.font.title.medium};

  cursor: pointer;
`;

const MenuList = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;

  ${theme.font.title.default}
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0 1rem;

  color: ${theme.color.neutral.text.default};

  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    color: ${theme.color.accent.text.weak};
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-grow: 0;
  flex-shrink: 0;
`;

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;

  cursor: pointer;
`;

const MobileMenu = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  height: 100vh;
  padding: 0.5rem 1.875rem;
  transform: translateX(-80%);
  visibility: hidden;

  background-color: ${theme.color.neutral.bg.default};
  transition: all 0.2s;

  z-index: ${theme.zIndex.modal};
  &.open {
    transform: translateX(0);
    display: flex;
    visibility: visible;
  }
`;

const MobileMenuTop = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MobileMenuList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const MobileMenuItem = styled.li`
  display: flex;
  padding: 0.5rem 0;
  justify-content: space-between;
  align-items: center;

  ${theme.font.title.default}
  color: ${theme.color.neutral.text.default};

  cursor: pointer;
`;

const JoinUsMessage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0rem;

  ${theme.font.body.weak}
  color: ${theme.color.neutral.text.default};
`;

const MobileMenuButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0 0 0 / 0.5);
  z-index: ${({ theme }) => theme.zIndex.backDrop};
`;

export {
  HeaderLayout,
  NavContainer,
  RightContainer,
  ReviewMe,
  MenuList,
  MenuItem,
  LeftContainer,
  IconButton,
  MobileMenu,
  MobileMenuTop,
  MobileMenuList,
  MobileMenuItem,
  JoinUsMessage,
  MobileMenuButtonContainer,
  BackDrop,
};
