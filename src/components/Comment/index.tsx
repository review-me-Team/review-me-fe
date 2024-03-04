import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Icon, Label as EmojiLabel, theme, Label } from 'review-me-design-system';
import ReplyList, { Reply } from '@components/ReplyList';
import useHover from '@hooks/useHover';
import { useFeedbackReplyList } from '@apis/feedbackApi';
import { useQuestionReplyList } from '@apis/questionApi';
import { useEmojiList } from '@apis/utilApi';
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
  type: 'feedback' | 'question' | 'comment';
  id: number;
  content: string | null;
  commenterId: number;
  commenterName: string;
  commenterProfileUrl: string;
  createdAt: string;
  emojis: Emoji[];
  myEmojiId: number | null;
  checked?: boolean;
  bookmarked?: boolean;
  labelContent?: string | null;
  countOfReplies?: number;
  writerId?: number;
}

const Comment = ({
  type,
  id,
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
  const { resumeId } = useParams();
  const { isHover, changeHoverState } = useHover();
  const [isOpenReplyList, setIsOpenReplyList] = useState<boolean>(false);

  const ICON_SIZE = 24;
  const REPLY_ICON_SIZE = 20;

  const hasReplyIcon = typeof countOfReplies === 'number' && type !== 'comment';
  const hasCheckMarkIcon = typeof checked === 'boolean';
  const hasBookMarkIcon = typeof bookmarked === 'boolean';

  const { data: emojiList } = useEmojiList();
  const { data: feedbackReplyList, fetchNextPage: fetchNextFeedbackList } = useFeedbackReplyList({
    resumeId: Number(resumeId),
    feedbackId: id,
    enabled: type === 'feedback' && isOpenReplyList,
  });
  const { data: questionReplyList, fetchNextPage: fetchNextQuestionList } = useQuestionReplyList({
    resumeId: Number(resumeId),
    questionId: id,
    enabled: type === 'question' && isOpenReplyList,
  });

  const handleReplyButtonClick = () => {
    if (!hasReplyIcon) return;

    if (!isOpenReplyList) {
      if (type === 'feedback') fetchNextFeedbackList();
      if (type === 'question') fetchNextQuestionList();
    }

    setIsOpenReplyList((prev) => !prev);
  };

  let replies: Reply[] = [];

  if (type === 'feedback' && feedbackReplyList)
    replies = feedbackReplyList.pages
      .map((page) => page.feedbackComments)
      .flat()
      .map((reply) => ({ ...reply, parentId: reply.parentFeedbackId }));
  if (type === 'question' && questionReplyList)
    replies = questionReplyList.pages
      .map((page) => page.questionComments)
      .flat()
      .map((reply) => ({ ...reply, parentId: reply.parentQuestionId }));

  return (
    <>
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
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    color={theme.color.accent.bg.default}
                  />
                ) : (
                  <Icon
                    iconName="bookMark"
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    color={theme.color.accent.bg.strong}
                  />
                )}
              </IconButton>
            )}
            {hasCheckMarkIcon && (
              <IconButton>
                {checked ? (
                  <Icon
                    iconName="filledCheckMark"
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    color={theme.color.accent.bg.default}
                  />
                ) : (
                  <Icon
                    iconName="checkMark"
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    color={theme.color.accent.bg.strong}
                  />
                )}
              </IconButton>
            )}
            <IconButton>
              <Icon
                iconName="more"
                width={ICON_SIZE}
                height={ICON_SIZE}
                color={theme.color.accent.bg.strong}
              />
            </IconButton>
          </div>
        </Top>

        <CommentContent>
          {labelContent && <SelectedLabel>{labelContent}</SelectedLabel>}
          <Content>{content}</Content>
        </CommentContent>

        <Bottom>
          {hasReplyIcon && (
            <OpenReplyButton onClick={handleReplyButtonClick}>
              <Icon iconName="communication" width={REPLY_ICON_SIZE} height={REPLY_ICON_SIZE} />
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
              {emojiList?.map(({ id, emoji }) => {
                return (
                  <Label key={id} isActive={id === myEmojiId} py="0.5rem" px="0.75rem">
                    {emoji}
                  </Label>
                );
              })}
            </EmojiModal>
          </EmojiButtonContainer>

          <EmojiLabelList>
            {emojis.map(({ id, count }) => {
              const hasEmoji = count > 0;

              if (!hasEmoji) return;

              const emoji = emojiList?.find(({ id: emojiId }) => emojiId === id)?.emoji;

              return (
                <EmojiLabelItem key={id}>
                  <EmojiLabel isActive={id === myEmojiId} py="0" px="0.75rem">
                    {`${emoji} ${count}`}
                  </EmojiLabel>
                </EmojiLabelItem>
              );
            })}
          </EmojiLabelList>
        </Bottom>
      </CommentLayout>
      {isOpenReplyList && <ReplyList type={type} replies={replies} />}
    </>
  );
};

export default Comment;
