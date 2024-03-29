import { theme } from 'review-me-design-system';
import styled from 'styled-components';
import { breakPoints } from '@styles/common';

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1rem;
`;

const UserImg = styled.img`
  width: 5rem;
  height: 5rem;

  border-radius: 50%;
  fill: ${theme.color.neutral.bg.light};
`;

const UserName = styled.span`
  ${theme.font.title.medium}
  color: ${theme.color.neutral.text.strong};
`;

const FriendSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 50%;
  padding: 1.5rem;

  border-radius: 0.75rem;
  background: ${theme.color.neutral.bg.default};
  box-shadow: 0 0 1.5rem -0.25rem rgba(16, 24, 40, 0.08);

  @media ${breakPoints.desktop} {
    width: 50%;
  }
  @media ${breakPoints.tablet} {
    width: 60%;
  }
  @media ${breakPoints.mobile} {
    width: 100%;
  }
`;

const FriendSection = styled.section`
  width: 100%;
`;

const Title = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${theme.font.title.default}
  color: ${theme.color.neutral.text.strong};
`;

const OpenModalButton = styled.button`
  background-color: transparent;

  cursor: pointer;
`;

export { UserInfo, UserImg, UserName, FriendSectionContainer, FriendSection, Title, OpenModalButton };
