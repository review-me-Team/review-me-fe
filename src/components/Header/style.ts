import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const HeaderLayout = styled.header`
  width: 100%;
  padding: 0 2rem;

  background: ${theme.color.neutral.bg.default};
  border-bottom: 1px solid ${theme.palette.grey300};
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

const RightContainer = styled.div`
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
  height: 100%;
  padding: 0 1rem;

  color: ${theme.color.neutral.text.default};

  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    color: ${theme.color.accent.text.weak};
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-grow: 0;
  flex-shrink: 0;
`;

const UserInfoButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;

  cursor: pointer;
`;

export {
  HeaderLayout,
  NavContainer,
  RightContainer,
  ReviewMe,
  MenuList,
  MenuItem,
  LeftContainer,
  UserInfoButton,
};
