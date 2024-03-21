import React, { MouseEvent, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Icon, Label as EmojiLabel, theme } from 'review-me-design-system';
import { css } from 'styled-components';
import Dropdown from '@components/Dropdown';
import QuestionEditForm from '@components/QuestionForm/QuestionEditForm';
import QuestionReplyList from '@components/ReplyList/QuestionReplyList';
import useDropdown from '@hooks/useDropdown';
import useHover from '@hooks/useHover';
import { useUserContext } from '@contexts/userContext';
import {
  Question as QuestionType,
  useDeleteQuestion,
  usePatchBookMark,
  usePatchEmojiAboutQuestion,
  usePatchQuestionCheck,
} from '@apis/questionApi';
import { useEmojiList } from '@apis/utilApi';
import {
  CommentLayout as QuestionLayout,
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
  ContentContainer,
  CommentInfo,
  MoreIconContainer,
  ButtonsContainer,
} from '@styles/comment';
import { formatDate } from '@utils';

interface Props extends QuestionType {
  resumeId: number;
  resumePage: number;
  resumeWriterId: number;
}

const Question = ({
  resumeId,
  resumePage,
  resumeWriterId,
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
  const { jwt, user } = useUserContext();
  const { isHover, changeHoverState } = useHover();
  const { isDropdownOpen, openDropdown, closeDropdown } = useDropdown();
  const [isOpenReplyList, setIsOpenReplyList] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const ICON_SIZE = 24;
  const REPLY_ICON_SIZE = 20;

  const isCommenterUser = commenterId === user?.id;
  const isResumeWriterUser = resumeWriterId === user?.id;

  const { data: emojiList } = useEmojiList();

  const handleReplyButtonClick = () => {
    setIsOpenReplyList((prev) => !prev);
  };

  const { mutate: toggleEmoji } = usePatchEmojiAboutQuestion();
  const queryClient = useQueryClient();

  const handleEmojiLabelClick = (e: MouseEvent<HTMLDivElement>, clickedEmojiId: number) => {
    if (!jwt) return;

    const shouldDeleteEmoji = myEmojiId === clickedEmojiId;

    toggleEmoji(
      {
        resumeId,
        questionId: id,
        emojiId: shouldDeleteEmoji ? null : clickedEmojiId,
        jwt,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['questionList', resumeId, resumePage] });
        },
      },
    );
  };

  // 삭제
  const { mutate: deleteQuestion } = useDeleteQuestion();

  const handleDeleteBtnClick = () => {
    if (!jwt || !isCommenterUser) return;

    deleteQuestion(
      { resumeId, questionId: id, jwt },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['questionList', resumeId, resumePage] });
          closeDropdown();
        },
      },
    );
  };

  // 수정
  const handleEditBtnClick = () => {
    setIsEdited(true);
    closeDropdown();
  };

  // Check 수정
  const { mutate: toggleCheckAboutQuestion } = usePatchQuestionCheck({ resumePage });

  const handleCheckMarkClick = () => {
    if (!jwt || !isResumeWriterUser) return;

    toggleCheckAboutQuestion({
      resumeId,
      questionId: id,
      checked: !checked,
      jwt,
    });
  };

  // bookmark 수정
  const { mutate: toggleBookMark } = usePatchBookMark({ resumePage });

  const handleBookMarkClick = () => {
    if (!jwt || !isResumeWriterUser) return;

    toggleBookMark({
      resumeId,
      questionId: id,
      bookmarked: !bookmarked,
      jwt,
    });
  };

  return (
    <>
      <QuestionLayout>
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
              {isResumeWriterUser && (
                <IconButton onClick={handleBookMarkClick} disabled={content === null}>
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
              <IconButton onClick={handleCheckMarkClick} disabled={content === null}>
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
              {isCommenterUser && (
                <MoreIconContainer>
                  <IconButton onClick={openDropdown} disabled={content === null}>
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
                    <Dropdown.DropdownItem onClick={handleEditBtnClick}>수정</Dropdown.DropdownItem>
                    <Dropdown.DropdownItem
                      onClick={handleDeleteBtnClick}
                      $css={css`
                        color: ${theme.palette.red};
                      `}
                    >
                      삭제
                    </Dropdown.DropdownItem>
                  </Dropdown>
                </MoreIconContainer>
              )}
            </ButtonsContainer>
          )}
        </Top>

        {isEdited && (
          <QuestionEditForm
            resumeId={resumeId}
            resumePage={resumePage}
            questionId={id}
            initLabelContent={labelContent}
            initContent={content}
            onCancelEdit={() => setIsEdited(false)}
          />
        )}
        {!isEdited && (
          <>
            <ContentContainer>
              {labelContent && <SelectedLabel>{labelContent}</SelectedLabel>}
              <Content>{content ?? '삭제된 예상질문입니다.'}</Content>
            </ContentContainer>

            <Bottom>
              <OpenReplyButton onClick={handleReplyButtonClick}>
                <Icon iconName="communication" width={REPLY_ICON_SIZE} height={REPLY_ICON_SIZE} />
                <span>{countOfReplies}</span>
              </OpenReplyButton>
              <EmojiButtonContainer>
                <EmojiButton
                  onMouseEnter={() => changeHoverState(true)}
                  onMouseLeave={() => changeHoverState(false)}
                  disabled={content === null}
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
                  const isEmojiClickable = count > 0;

                  if (!isEmojiClickable) return;

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
      </QuestionLayout>
      {isOpenReplyList && <QuestionReplyList parentId={id} resumeId={resumeId} />}
    </>
  );
};

export default Question;
