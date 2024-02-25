import { theme } from 'review-me-design-system';
import styled from 'styled-components';
import { ellipsisStyles } from '@styles/common';

const ResumeItemLayout = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;

  background-color: ${theme.color.neutral.bg.default};
  border: 1px solid ${theme.color.accent.bd.strong};

  color: ${theme.color.accent.text.strong};
  ${theme.font.body.default};

  cursor: pointer;
`;

const Title = styled.span`
  ${theme.font.title.default}
  ${ellipsisStyles}
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & > span {
    ${ellipsisStyles}
  }
`;

const UserImg = styled.img`
  width: 2.25rem;
  height: 2.25rem;

  border-radius: 50%;
  border: 0.0625rem solid ${theme.color.accent.bd.strong};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > span {
    ${ellipsisStyles}
  }
`;

export { ResumeItemLayout, Title, User, UserImg, UserInfo };
