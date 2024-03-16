import { theme } from 'review-me-design-system';
import styled from 'styled-components';
import { ellipsisStyles } from '@styles/common';

const FriendItemLayout = styled.li`
  display: flex;
  padding: 0.75rem 0rem;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 50%;
`;

const UserImg = styled.img`
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;

  border-radius: 50%;
  background-color: ${theme.color.neutral.bg.light};
`;

const UserName = styled.span`
  ${theme.font.body.default}
  color: ${theme.color.neutral.text.default};

  ${ellipsisStyles}
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  margin-left: 0.25rem;
`;

export { FriendItemLayout, UserInfo, UserImg, UserName, ButtonsContainer };
