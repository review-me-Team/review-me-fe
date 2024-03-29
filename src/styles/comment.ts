import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const CommentLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1rem;

  color: ${theme.color.neutral.text.default};
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

const MoreIconContainer = styled.div`
  position: relative;
`;

const IconButton = styled.button`
  height: 1.5rem;
  background-color: transparent;
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const UserName = styled.span`
  ${theme.font.title.weak}
`;

const Time = styled.span`
  color: ${theme.color.neutral.text.sub};
  ${theme.font.body.weak}
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SelectedLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 0 0.5rem;

  background: ${theme.palette.green300};
  border-radius: 1rem;

  ${theme.font.body.weak}
  color: ${theme.color.neutral.text.default}
`;

const Content = styled.span`
  ${theme.font.body.weak}

  white-space: pre-wrap;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const OpenReplyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  background-color: transparent;

  ${theme.font.label}
  color: ${theme.palette.gray600};

  cursor: pointer;

  & > svg {
    fill: ${theme.palette.gray600};
  }
`;

const EmojiButtonContainer = styled.div`
  position: relative;
`;

const EmojiButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;

  background-color: ${theme.palette.gray300};
  border-radius: 50%;

  & > svg {
    fill: ${theme.palette.gray600};
  }

  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const EmojiLabelList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const EmojiLabelItem = styled.li`
  margin-right: 0.5rem;
`;

const EmojiModal = styled.div`
  display: none;
  padding: 0.5rem;
  gap: 0.25rem;
  position: absolute;
  left: -0.75rem;
  top: auto;
  bottom: 100%;
  z-index: ${theme.zIndex.modal};

  background-color: ${theme.color.neutral.bg.default};
  border-radius: 1rem;
  box-shadow: 0 0 0.625rem 0 rgba(0, 0, 0, 0.25);

  &.active {
    display: flex;
  }
`;

export {
  CommentLayout,
  Top,
  Info,
  IconButton,
  ButtonsContainer,
  MoreIconContainer,
  CommentInfo,
  UserImg,
  UserName,
  Time,
  SelectedLabel,
  Content,
  ContentContainer,
  Bottom,
  OpenReplyButton,
  EmojiButtonContainer,
  EmojiButton,
  EmojiModal,
  EmojiLabelList,
  EmojiLabelItem,
};
