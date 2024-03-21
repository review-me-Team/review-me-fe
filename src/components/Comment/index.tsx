import React, { MouseEvent, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Icon, Label as EmojiLabel, theme } from 'review-me-design-system';
import { css } from 'styled-components';
import CommentEditForm from '@components/CommentForm/CommentEditForm';
import Dropdown from '@components/Dropdown';
import useDropdown from '@hooks/useDropdown';
import useHover from '@hooks/useHover';
import { useUserContext } from '@contexts/userContext';
import { usePatchEmojiAboutComment, Comment as CommentType, useDeleteComment } from '@apis/commentApi';
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
  CommentInfo,
  MoreIconContainer,
  ButtonsContainer,
} from '@styles/comment';
import { formatDate } from '@utils';

interface Props extends CommentType {
  resumeId: number;
}

const Comment = ({
  resumeId,
  id,
  content,
  commenterId,
  commenterName,
  commenterProfileUrl,
  createdAt,
  emojis,
  myEmojiId,
}: Props) => {
  const { jwt, user } = useUserContext();
  const { isHover, changeHoverState } = useHover();
  const { isDropdownOpen, openDropdown, closeDropdown } = useDropdown();
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const ICON_SIZE = 24;

  const isCommenterUser = commenterId === user?.id;

  const { data: emojiList } = useEmojiList();

  const { mutate: toggleEmojiAboutComment } = usePatchEmojiAboutComment();
  const queryClient = useQueryClient();

  const handleEmojiLabelClick = (e: MouseEvent<HTMLDivElement>, clickedEmojiId: number) => {
    if (!jwt) return;

    const shouldDeleteEmoji = myEmojiId === clickedEmojiId;

    toggleEmojiAboutComment(
      {
        resumeId,
        commentId: id,
        emojiId: shouldDeleteEmoji ? null : clickedEmojiId,
        jwt,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['commentList', resumeId] });
        },
      },
    );
  };

  // 삭제
  const { mutate: deleteComment } = useDeleteComment();

  const handleDeleteBtnClick = () => {
    if (!jwt) return;

    deleteComment(
      { resumeId, commentId: id, jwt },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['commentList', resumeId] });
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
          <CommentEditForm
            resumeId={resumeId}
            commentId={id}
            initContent={content}
            onCancelEdit={() => setIsEdited(false)}
          />
        )}
        {!isEdited && (
          <>
            <Content>{content ?? '삭제된 댓글입니다.'}</Content>

            <Bottom>
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
      </CommentLayout>
    </>
  );
};

export default Comment;
