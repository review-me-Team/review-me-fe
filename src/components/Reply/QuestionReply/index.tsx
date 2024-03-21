import React, { MouseEvent, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Icon, Label as EmojiLabel, theme } from 'review-me-design-system';
import { css } from 'styled-components';
import Dropdown from '@components/Dropdown';
import ReplyEditForm from '@components/ReplyForm/ReplyEditForm';
import useDropdown from '@hooks/useDropdown';
import useHover from '@hooks/useHover';
import { useUserContext } from '@contexts/userContext';
import {
  QuestionReply as QuestionReplyType,
  useDeleteQuestion,
  usePatchEmojiAboutQuestion,
} from '@apis/questionApi';
import { useEmojiList } from '@apis/utilApi';
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
  ContentContainer,
  CommentInfo,
  MoreIconContainer,
} from '@styles/comment';
import { formatDate } from '@utils';

interface Props extends QuestionReplyType {
  resumeId: number;
}

const QuestionReply = ({
  resumeId,
  id,
  parentQuestionId,
  content,
  commenterId,
  commenterName,
  commenterProfileUrl,
  createdAt,
  emojis,
  myEmojiId,
}: Props) => {
  const { isHover, changeHoverState } = useHover();
  const { isDropdownOpen, openDropdown, closeDropdown } = useDropdown();
  const { jwt, user } = useUserContext();

  const [isEdited, setIsEdited] = useState<boolean>(false);

  const ICON_SIZE = 24;

  const isCommenterUser = commenterId === user?.id;

  const { data: emojiList } = useEmojiList();

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
          queryClient.invalidateQueries({ queryKey: ['questionReplyList', resumeId, parentQuestionId] });
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
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['questionReplyList', resumeId, parentQuestionId] });
        },
      },
    );
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

        {!isEdited && isCommenterUser && (
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
              <Dropdown.DropdownItem onClick={() => setIsEdited(true)}>수정</Dropdown.DropdownItem>
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
      </Top>

      {isEdited && (
        <ReplyEditForm
          type="question"
          resumeId={resumeId}
          parentId={parentQuestionId}
          id={id}
          initContent={content}
          onCancelEdit={() => {
            setIsEdited(false);
            closeDropdown();
          }}
        />
      )}

      {!isEdited && (
        <>
          <ContentContainer>
            <Content>{content}</Content>
          </ContentContainer>

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
    </CommentLayout>
  );
};

export default QuestionReply;
