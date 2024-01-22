import React from 'react';
import { Icon, Label as EmojiLabel, theme, Label } from 'review-me-design-system';
import useHover from '@hooks/useHover';
import { formatDate } from '@utils';
import {
  CommentLayout,
  Info,
  Time,
  UserImg,
  UserName,
  SelectedLabel,
  Content,
  Bottom,
  OpenReplyButton,
  EmojiButton,
  Top,
  IconButton,
  EmojiModal,
  EmojiContainer,
} from './style';

type Emoji = {
  id: number;
  count: number;
};

interface Props {
  // id: number;
  content: string;
  writerId: number;
  writerName: string;
  writerProfileUrl: string;
  createdAt: string;
  checked: boolean;
  emojis: Emoji[];
  myEmojiId: number;
  bookmarked?: boolean;
  labelContent?: string;
  countOfReplies?: number;
}

const Comment = ({
  // id,
  content,
  writerId,
  writerName,
  writerProfileUrl,
  labelContent,
  createdAt,
  countOfReplies,
  checked,
  bookmarked,
  emojis,
  myEmojiId,
}: Props) => {
  const { isHover, changeHoverState } = useHover();

  return (
    <CommentLayout>
      <Top>
        <Info>
          <UserImg src={writerProfileUrl} />
          <UserName>{writerName}</UserName>
          <Time>{formatDate(createdAt)}</Time>
        </Info>

        <div>
          <IconButton>
            {bookmarked !== undefined &&
              (bookmarked ? (
                <Icon
                  iconName="filledBookMark"
                  width={28}
                  height={28}
                  color={theme.color.accent.bg.default}
                />
              ) : (
                <Icon iconName="bookMark" width={28} height={28} color={theme.color.accent.bg.strong} />
              ))}
          </IconButton>
          <IconButton>
            {checked ? (
              <Icon iconName="filledCheckMark" width={28} height={28} color={theme.color.accent.bg.default} />
            ) : (
              <Icon iconName="checkMark" width={28} height={28} color={theme.color.accent.bg.strong} />
            )}
          </IconButton>
          <IconButton>
            <Icon iconName="more" width={28} height={28} color={theme.color.accent.bg.strong} />
          </IconButton>
        </div>
      </Top>

      {labelContent && <SelectedLabel>{labelContent}</SelectedLabel>}

      <Content>{content}</Content>

      <Bottom>
        {countOfReplies && (
          <OpenReplyButton>
            <Icon iconName="communication" />
            <span>{countOfReplies}</span>
          </OpenReplyButton>
        )}
        <EmojiContainer>
          <EmojiButton
            onMouseEnter={() => changeHoverState(true)}
            onMouseLeave={() => changeHoverState(false)}
          >
            <Icon iconName="emoji" />
          </EmojiButton>
          <EmojiModal
            className={isHover ? 'active' : ''}
            onMouseEnter={() => changeHoverState(true)}
            onMouseLeave={() => changeHoverState(false)}
          >
            {/* todo: 서버에서 받은 이모지 리스트로 수정 및 isActive를 emojiId === myEmojiId로 수정하기 */}
            <Label isActive={false} py="0.5rem" px="0.75rem">
              🤔
            </Label>
            <Label isActive={false} py="0.5rem" px="0.75rem">
              👍
            </Label>
            <Label isActive={false} py="0.5rem" px="0.75rem">
              👀
            </Label>
            <Label isActive={false} py="0.5rem" px="0.75rem">
              😎
            </Label>
            <Label isActive={false} py="0.5rem" px="0.75rem">
              🙏
            </Label>
          </EmojiModal>
        </EmojiContainer>

        {emojis.map(({ id, count }) => {
          return (
            <EmojiLabel key={id} isActive={id === myEmojiId} px="0.75rem">
              🤔 {count}
            </EmojiLabel>
          );
        })}
      </Bottom>
    </CommentLayout>
  );
};

export default Comment;
