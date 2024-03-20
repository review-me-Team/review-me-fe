import React, { MouseEvent, useState } from 'react';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { Icon, Label as EmojiLabel, theme } from 'review-me-design-system';
import { css } from 'styled-components';
import Dropdown from '@components/Dropdown';
import FeedbackEditForm from '@components/FeedbackForm/FeedbackEditForm';
import FeedbackReplyList from '@components/ReplyList/FeedbackReplyList';
import useDropdown from '@hooks/useDropdown';
import useEmojiUpdate from '@hooks/useEmojiUpdate';
import useHover from '@hooks/useHover';
import { useUserContext } from '@contexts/userContext';
import {
  Feedback as FeedbackType,
  GetFeedbackList,
  useDeleteFeedback,
  usePatchEmojiAboutFeedback,
  usePatchFeedbackCheck,
} from '@apis/feedbackApi';
import { useEmojiList } from '@apis/utilApi';
import {
  CommentLayout as FeedbackLayout,
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

interface Props extends FeedbackType {
  resumeId: number;
  resumePage: number;
  resumeWriterId: number;
}

const Feedback = ({
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

  const { mutate: toggleEmoji } = usePatchEmojiAboutFeedback();
  const { updateEmojis } = useEmojiUpdate();
  const queryClient = useQueryClient();

  const handleEmojiLabelClick = (e: MouseEvent<HTMLDivElement>, clickedEmojiId: number) => {
    if (!jwt) return;

    const shouldDeleteEmoji = myEmojiId === clickedEmojiId;

    toggleEmoji(
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
                    updateEmojis<FeedbackType>({ data: feedback, id, clickedEmojiId, myEmojiId }),
                  ),
                })),
              };
            },
          );
        },
      },
    );
  };

  // 삭제
  const { mutate: deleteFeedback } = useDeleteFeedback();

  const handleDeleteBtnClick = () => {
    if (!jwt || !isCommenterUser) return;

    deleteFeedback(
      { resumeId, feedbackId: id, jwt },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['feedbackList', resumeId, resumePage] });
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
  const { mutate: toggleCheck } = usePatchFeedbackCheck({ resumePage });

  const handleCheckMarkClick = () => {
    if (!jwt || !isResumeWriterUser) return;

    toggleCheck({
      resumeId,
      feedbackId: id,
      checked: !checked,
      jwt,
    });
  };

  return (
    <>
      <FeedbackLayout>
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
          <FeedbackEditForm
            resumeId={resumeId}
            resumePage={resumePage}
            feedbackId={id}
            initLabelContent={labelContent}
            initContent={content}
            onCancelEdit={() => setIsEdited(false)}
          />
        )}
        {!isEdited && (
          <>
            <ContentContainer>
              {labelContent && <SelectedLabel>{labelContent}</SelectedLabel>}
              <Content>{content ?? '삭제된 피드백입니다.'}</Content>
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
      </FeedbackLayout>
      {isOpenReplyList && <FeedbackReplyList parentId={id} resumeId={resumeId} />}
    </>
  );
};

export default Feedback;
