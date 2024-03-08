import React, { MouseEvent } from 'react';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { Icon, Label as EmojiLabel, theme } from 'review-me-design-system';
import useEmojiUpdate from '@hooks/useEmojiUpdate';
import useHover from '@hooks/useHover';
import { useUserContext } from '@contexts/userContext';
import { FeedbackReply, GetFeedbackReplyList, usePatchEmojiAboutFeedback } from '@apis/feedbackApi';
import { usePatchEmojiAboutQuestion } from '@apis/questionApi';
import { useEmojiList } from '@apis/utilApi';
import { formatDate } from '@utils';
// * Comment와 동일한 스타일을 공유하기 때문에 styled-components로 만든 공통 컴포넌트를 사용
import {
  CommentLayout,
  Info,
  Time,
  UserImg,
  UserName,
  Content,
  Bottom,
  EmojiButton,
  Top,
  IconButton,
  EmojiModal,
  EmojiButtonContainer,
  EmojiLabelList,
  EmojiLabelItem,
  CommentContent,
  CommentInfo,
} from '../style';

type Emoji = {
  id: number;
  count: number;
};

export interface ReplyType {
  id: number;
  parentId: number;
  content: string | null;
  commenterId: number;
  commenterName: string;
  commenterProfileUrl: string;
  createdAt: string;
  emojis: Emoji[];
  myEmojiId: number | null;
}

interface Props extends ReplyType {
  type: 'feedback' | 'question';
  resumeId: number;
}

const Reply = ({
  type,
  resumeId,
  id,
  parentId,
  content,
  commenterId,
  commenterName,
  commenterProfileUrl,
  createdAt,
  emojis,
  myEmojiId,
}: Props) => {
  const { isHover, changeHoverState } = useHover();
  const { jwt, isLoggedIn, user } = useUserContext();
  const isAuthenticated = jwt && isLoggedIn;

  const ICON_SIZE = 24;

  const hasMoreIcon = commenterId === user?.id;

  const { data: emojiList } = useEmojiList();

  const { mutate: toggleEmojiAboutFeedback } = usePatchEmojiAboutFeedback();
  const { mutate: toggleEmojiAboutQuestion } = usePatchEmojiAboutQuestion();
  const { updateEmojis } = useEmojiUpdate();
  const queryClient = useQueryClient();

  const handleEmojiLabelClick = (e: MouseEvent<HTMLDivElement>, clickedEmojiId: number) => {
    if (!isAuthenticated) return;

    const shouldDeleteEmoji = myEmojiId === clickedEmojiId;

    if (type === 'feedback')
      toggleEmojiAboutFeedback(
        {
          resumeId,
          feedbackId: id,
          emojiId: shouldDeleteEmoji ? null : clickedEmojiId,
          jwt,
        },
        {
          onSuccess: () => {
            queryClient.setQueryData<InfiniteData<GetFeedbackReplyList>>(
              ['feedbackReplyList', resumeId, parentId],
              (oldData) => {
                if (!oldData) return;

                return {
                  ...oldData,
                  pages: oldData.pages.map((page) => ({
                    ...page,
                    feedbackComments: page.feedbackComments.map((comment) =>
                      updateEmojis<FeedbackReply>({ data: comment, id, clickedEmojiId, myEmojiId }),
                    ),
                  })),
                };
              },
            );
          },
        },
      );

    if (type === 'question')
      toggleEmojiAboutQuestion({
        resumeId,
        questionId: id,
        emojiId: shouldDeleteEmoji ? null : clickedEmojiId,
        jwt,
      });
  };

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

        {hasMoreIcon && (
          <IconButton>
            <Icon iconName="more" width={ICON_SIZE} height={ICON_SIZE} color={theme.color.accent.bg.strong} />
          </IconButton>
        )}
      </Top>

      <CommentContent>
        <Content>{content}</Content>
      </CommentContent>

      <Bottom>
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
                <EmojiLabel
                  key={id}
                  isActive={id === myEmojiId}
                  py="0.5rem"
                  px="0.75rem"
                  onClick={(e) => handleEmojiLabelClick(e, id)}
                >
                  {emoji}
                </EmojiLabel>
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
                <EmojiLabel
                  isActive={id === myEmojiId}
                  py="0"
                  px="0.75rem"
                  onClick={(e) => handleEmojiLabelClick(e, id)}
                >
                  {`${emoji} ${count}`}
                </EmojiLabel>
              </EmojiLabelItem>
            );
          })}
        </EmojiLabelList>
      </Bottom>
    </CommentLayout>
  );
};

export default Reply;
