import React, { MouseEvent, useState } from 'react';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { Icon, Label as EmojiLabel, theme } from 'review-me-design-system';
import { css } from 'styled-components';
import Dropdown from '@components/Dropdown';
import QuestionEditForm from '@components/QuestionForm/QuestionEditForm';
import ReplyList from '@components/ReplyList';
import useDropdown from '@hooks/useDropdown';
import useEmojiUpdate from '@hooks/useEmojiUpdate';
import useHover from '@hooks/useHover';
import { useUserContext } from '@contexts/userContext';
import {
  GetCommentList,
  usePatchEmojiAboutComment,
  Comment as CommentType,
  useDeleteComment,
} from '@apis/commentApi';
import {
  Feedback,
  GetFeedbackList,
  useDeleteFeedback,
  usePatchEmojiAboutFeedback,
  usePatchFeedbackCheck,
} from '@apis/feedbackApi';
import {
  GetQuestionList,
  Question,
  useDeleteQuestion,
  usePatchBookMark,
  usePatchEmojiAboutQuestion,
  usePatchQuestionCheck,
} from '@apis/questionApi';
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
  MoreIconContainer,
  ButtonsContainer,
} from './style';

type Emoji = {
  id: number;
  count: number;
};

interface Props {
  type: 'feedback' | 'question' | 'comment';
  resumeId: number;
  resumePage: number;
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
}

const Comment = ({
  type,
  resumeId,
  resumePage,
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
}: Props) => {
  const { jwt, isLoggedIn, user } = useUserContext();
  const isAuthenticated = jwt && isLoggedIn;
  const { isHover, changeHoverState } = useHover();
  const { isDropdownOpen, openDropdown, closeDropdown } = useDropdown();
  const [isOpenReplyList, setIsOpenReplyList] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const ICON_SIZE = 24;
  const REPLY_ICON_SIZE = 20;

  const hasReplyIcon = typeof countOfReplies === 'number' && type !== 'comment';
  const hasCheckMarkIcon = typeof checked === 'boolean';
  const hasBookMarkIcon = typeof bookmarked === 'boolean';
  const hasMoreIcon = commenterId === user?.id;

  const { data: emojiList } = useEmojiList();

  const handleReplyButtonClick = () => {
    if (!hasReplyIcon) return;

    setIsOpenReplyList((prev) => !prev);
  };

  const { mutate: toggleEmojiAboutFeedback } = usePatchEmojiAboutFeedback();
  const { mutate: toggleEmojiAboutQuestion } = usePatchEmojiAboutQuestion();
  const { mutate: toggleEmojiAboutComment } = usePatchEmojiAboutComment();
  const { updateEmojis } = useEmojiUpdate();
  const queryClient = useQueryClient();

  const handleEmojiLabelClick = (e: MouseEvent<HTMLDivElement>, clickedEmojiId: number) => {
    if (!isAuthenticated) return;

    const shouldDeleteEmoji = myEmojiId === clickedEmojiId;

    switch (type) {
      case 'feedback':
        toggleEmojiAboutFeedback(
          {
            resumeId,
            feedbackId: id,
            emojiId: shouldDeleteEmoji ? null : clickedEmojiId,
            jwt,
          },
          {
            onSuccess: () => {
              queryClient.setQueryData<InfiniteData<GetFeedbackList>>(
                ['feedbackList', resumeId, resumePage],
                (oldData) => {
                  if (!oldData) return;

                  return {
                    ...oldData,
                    pages: oldData.pages.map((page) => ({
                      ...page,
                      feedbacks: page.feedbacks.map((feedback) =>
                        updateEmojis<Feedback>({ data: feedback, id, clickedEmojiId, myEmojiId }),
                      ),
                    })),
                  };
                },
              );
            },
          },
        );
        break;
      case 'question':
        toggleEmojiAboutQuestion(
          {
            resumeId,
            questionId: id,
            emojiId: shouldDeleteEmoji ? null : clickedEmojiId,
            jwt,
          },
          {
            onSuccess: () => {
              queryClient.setQueryData<InfiniteData<GetQuestionList>>(
                ['questionList', resumeId, resumePage],
                (oldData) => {
                  if (!oldData) return;

                  return {
                    ...oldData,
                    pages: oldData.pages.map((page) => ({
                      ...page,
                      questions: page.questions.map((question) =>
                        updateEmojis<Question>({ data: question, id, clickedEmojiId, myEmojiId }),
                      ),
                    })),
                  };
                },
              );
            },
          },
        );
        break;
      case 'comment':
        toggleEmojiAboutComment(
          {
            resumeId,
            commentId: id,
            emojiId: shouldDeleteEmoji ? null : clickedEmojiId,
            jwt,
          },
          {
            onSuccess: () => {
              queryClient.setQueryData<InfiniteData<GetCommentList>>(['commentList', resumeId], (oldData) => {
                if (!oldData) return;

                return {
                  ...oldData,
                  pages: oldData.pages.map((page) => ({
                    ...page,
                    comments: page.comments.map((comment) =>
                      updateEmojis<CommentType>({ data: comment, id, clickedEmojiId, myEmojiId }),
                    ),
                  })),
                };
              });
            },
          },
        );
        break;
    }
  };

  // 삭제
  const { mutate: deleteFeedback } = useDeleteFeedback();
  const { mutate: deleteQuestion } = useDeleteQuestion();
  const { mutate: deleteComment } = useDeleteComment();

  const handleDeleteBtnClick = () => {
    if (!jwt) return;

    if (type === 'feedback') {
      deleteFeedback(
        { resumeId, feedbackId: id, jwt },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feedbackList', resumeId, resumePage] });
          },
        },
      );
    }
    if (type === 'question') {
      deleteQuestion(
        { resumeId, questionId: id, jwt },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['questionList', resumeId, resumePage] });
          },
        },
      );
    }
    if (type === 'comment') {
      deleteComment(
        { resumeId, commentId: id, jwt },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['commentList', resumeId] });
          },
        },
      );
    }
  };

  // 수정
  const handleEditBtnClick = () => {
    setIsEdited(true);
    closeDropdown();
  };

  // Check 수정
  const { mutate: toggleCheckAboutFeedback } = usePatchFeedbackCheck({ resumePage });
  const { mutate: toggleCheckAboutQuestion } = usePatchQuestionCheck({ resumePage });

  const handleCheckMarkClick = () => {
    if (!jwt) return;

    if (type === 'feedback') {
      toggleCheckAboutFeedback({
        resumeId,
        feedbackId: id,
        checked: !checked,
        jwt,
      });
    }
    if (type === 'question') {
      toggleCheckAboutQuestion({
        resumeId,
        questionId: id,
        checked: !checked,
        jwt,
      });
    }
  };

  // bookmark 수정
  const { mutate: toggleBookMark } = usePatchBookMark({ resumePage });

  const handleBookMarkClick = () => {
    if (type !== 'question' || !jwt) return;

    toggleBookMark({
      resumeId,
      questionId: id,
      bookmarked: !bookmarked,
      jwt,
    });
  };

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

          {!isEdited && (
            <ButtonsContainer>
              {hasBookMarkIcon && (
                <IconButton onClick={handleBookMarkClick}>
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
                <IconButton onClick={handleCheckMarkClick}>
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
              {hasMoreIcon && (
                <MoreIconContainer>
                  <IconButton onClick={openDropdown}>
                    <Icon
                      iconName="more"
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                      color={theme.color.accent.bg.strong}
                    />
                  </IconButton>
                  <Dropdown
                    isOpen={isDropdownOpen}
                    onClose={closeDropdown}
                    css={css`
                      width: 4rem;
                      top: 1.5rem;
                      right: 0;
                    `}
                  >
                    <Dropdown.DropdownItem onClick={handleEditBtnClick} disabled={content === null}>
                      수정
                    </Dropdown.DropdownItem>
                    <Dropdown.DropdownItem
                      onClick={handleDeleteBtnClick}
                      $css={css`
                        color: ${theme.palette.red};
                      `}
                      disabled={content === null}
                    >
                      삭제
                    </Dropdown.DropdownItem>
                  </Dropdown>
                </MoreIconContainer>
              )}
            </ButtonsContainer>
          )}
        </Top>

        {isEdited && type === 'question' && (
          <QuestionEditForm
            resumeId={resumeId}
            resumePage={resumePage}
            questionId={id}
            initLabelContent={labelContent || null}
            initContent={content}
            onCancelEdit={() => setIsEdited(false)}
          />
        )}
        {!isEdited && (
          <>
            <CommentContent>
              {labelContent && <SelectedLabel>{labelContent}</SelectedLabel>}
              <Content>{content ?? '삭제된 댓글입니다.'}</Content>
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
          </>
        )}
      </CommentLayout>
      {hasReplyIcon && isOpenReplyList && <ReplyList type={type} parentId={id} resumeId={resumeId} />}
    </>
  );
};

export default Comment;
