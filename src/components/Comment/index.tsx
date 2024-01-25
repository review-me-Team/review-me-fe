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
  EmojiButtonContainer,
  EmojiLabelList,
  EmojiLabelItem,
  CommentContent,
  CommentInfo,
} from './style';

type Emoji = {
  id: number;
  count: number;
};

interface Props {
  // id: number;
  content: string;
  commenterId: number;
  commenterName: string;
  commenterProfileUrl: string;
  createdAt: string;
  emojis: Emoji[];
  myEmojiId: number;
  checked?: boolean;
  bookmarked?: boolean;
  labelContent?: string;
  countOfReplies?: number;
  writerId?: number;
}

const Comment = ({
  // id,
  content,
  commenterId,
  commenterName,
  commenterProfileUrl,
  labelContent,
  createdAt,
  countOfReplies,
  checked,
  bookmarked,
  emojis,
  myEmojiId,
  writerId,
}: Props) => {
  const { isHover, changeHoverState } = useHover();
  const hasReply = countOfReplies === undefined;
  const hasCheckMarkIcon = typeof checked === 'boolean';
  const hasBookMarkIcon = typeof bookmarked === 'boolean' && commenterId === writerId;

  return (
    <CommentLayout>
      <Top>
        <Info>
          <UserImg src={commenterProfileUrl} />
          <CommentInfo>
            <UserName>{commenterName}</UserName>
            <Time>{formatDate(createdAt)}</Time>
          </CommentInfo>
        </Info>

        <div>
          {hasBookMarkIcon && (
            <IconButton>
              {bookmarked ? (
                <Icon
                  iconName="filledBookMark"
                  width={24}
                  height={24}
                  color={theme.color.accent.bg.default}
                />
              ) : (
                <Icon iconName="bookMark" width={24} height={24} color={theme.color.accent.bg.strong} />
              )}
            </IconButton>
          )}
          {hasCheckMarkIcon && (
            <IconButton>
              {checked ? (
                <Icon
                  iconName="filledCheckMark"
                  width={24}
                  height={24}
                  color={theme.color.accent.bg.default}
                />
              ) : (
                <Icon iconName="checkMark" width={24} height={24} color={theme.color.accent.bg.strong} />
              )}
            </IconButton>
          )}
          <IconButton>
            <Icon iconName="more" width={24} height={24} color={theme.color.accent.bg.strong} />
          </IconButton>
        </div>
      </Top>

      <CommentContent>
        {labelContent && <SelectedLabel>{labelContent}</SelectedLabel>}
        <Content>{content}</Content>
      </CommentContent>

      <Bottom>
        {!hasReply && (
          <OpenReplyButton>
            <Icon iconName="communication" width={24} height={24} />
            <span>{countOfReplies}</span>
          </OpenReplyButton>
        )}
        <EmojiButtonContainer>
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
        </EmojiButtonContainer>

        <EmojiLabelList>
          {emojis.map(({ id, count }) => {
            return (
              <EmojiLabelItem key={id}>
                <EmojiLabel isActive={id === myEmojiId} py="0" px="0.75rem">
                  🤔 {count}
                </EmojiLabel>
              </EmojiLabelItem>
            );
          })}
        </EmojiLabelList>
      </Bottom>
    </CommentLayout>
  );
};

export default Comment;
