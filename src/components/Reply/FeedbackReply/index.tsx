import React, { MouseEvent, useState } from 'react';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { Icon, Label as EmojiLabel, theme } from 'review-me-design-system';
import { css } from 'styled-components';
import Dropdown from '@components/Dropdown';
import ReplyEditForm from '@components/ReplyForm/ReplyEditForm';
import useDropdown from '@hooks/useDropdown';
import useEmojiUpdate from '@hooks/useEmojiUpdate';
import useHover from '@hooks/useHover';
import { useUserContext } from '@contexts/userContext';
import {
  FeedbackReply as FeedbackReplyType,
  GetFeedbackReplyList,
  useDeleteFeedback,
  usePatchEmojiAboutFeedback,
} from '@apis/feedbackApi';
import { useEmojiList } from '@apis/utilApi';
import {
  CommentLayout as ReplyLayout,
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

interface Props extends FeedbackReplyType {
  resumeId: number;
}

const FeedbackReply = ({
  resumeId,
  id,
  parentFeedbackId,
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
          queryClient.setQueryData<InfiniteData<GetFeedbackReplyList>>(
            ['feedbackReplyList', resumeId, parentFeedbackId],
            (oldData) => {
              if (!oldData) return;

              return {
                ...oldData,
                pages: oldData.pages.map((page) => ({
                  ...page,
                  feedbackComments: page.feedbackComments.map((comment) =>
                    updateEmojis<FeedbackReplyType>({ data: comment, id, clickedEmojiId, myEmojiId }),
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
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['feedbackReplyList', resumeId, parentFeedbackId] });
        },
      },
    );
  };

  return (
    <ReplyLayout>
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
          type="feedback"
          resumeId={resumeId}
          parentId={parentFeedbackId}
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

                console.log(id, myEmojiId);

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
    </ReplyLayout>
  );
};

export default FeedbackReply;
