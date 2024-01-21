import React from 'react';
import { Icon, Label as EmojiLabel, theme } from 'review-me-design-system';
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
        <EmojiButton>
          <Icon iconName="emoji" />
        </EmojiButton>
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
