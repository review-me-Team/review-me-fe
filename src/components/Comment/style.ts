import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const CommentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem 1rem;

  color: ${theme.color.neutral.text.default};
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  height: 1.75rem;
  background-color: transparent;
  cursor: pointer;
`;

const UserImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const UserName = styled.span`
  ${theme.font.title.default}
`;

const Time = styled.span`
  color: ${theme.color.neutral.text.sub};
  ${theme.font.body.default}
`;

const SelectedLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 0.5rem 1.25rem;

  background: ${theme.color.accent.bg.default};
  border-radius: 1rem;

  ${theme.font.label}
  color: ${theme.color.neutral.text.weak}
`;

const Content = styled.span`
  ${theme.font.body.default}
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const OpenReplyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  background-color: transparent;

  ${theme.font.label}
  color: ${theme.palette.grey600};

  cursor: pointer;

  & > svg {
    fill: ${theme.palette.grey600};
  }
`;

const EmojiButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;

  background-color: ${theme.palette.grey300};
  border-radius: 50%;

  & > svg {
    fill: ${theme.palette.grey600};
  }

  cursor: pointer;
`;

export {
  CommentLayout,
  Top,
  Info,
  IconButton,
  UserImg,
  UserName,
  Time,
  SelectedLabel,
  Content,
  Bottom,
  OpenReplyButton,
  EmojiButton,
};
