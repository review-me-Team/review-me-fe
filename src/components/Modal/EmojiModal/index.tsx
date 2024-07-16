import React from 'react';
import { Label as EmojiLabel, Icon } from 'review-me-design-system';
import useHover from '@hooks/useHover';
import { useEmojiList } from '@apis/utilApi';
import { EmojiButton, EmojiModalLayout, EmojiModalWrapper } from './style';

interface Props {
  canOpen?: boolean;
  myEmojiId: number | null;
  onClickEmoji: (clickedEmojiId: number) => void;
}

const EmojiModal = ({ canOpen = true, myEmojiId, onClickEmoji }: Props) => {
  const { isHover, changeHoverState } = useHover();
  const { data: emojiList } = useEmojiList();

  return (
    <EmojiModalLayout>
      <EmojiButton
        aria-label="이모지"
        onMouseEnter={() => changeHoverState(true)}
        onMouseLeave={() => changeHoverState(false)}
        onFocus={() => changeHoverState(true)}
        disabled={!canOpen}
      >
        <Icon iconName="emoji" />
      </EmojiButton>
      <EmojiModalWrapper
        className={isHover ? 'active' : ''}
        onMouseEnter={() => changeHoverState(true)}
        onMouseLeave={() => changeHoverState(false)}
      >
        {emojiList?.map(({ id, emoji }, idx) => {
          const isLastEmoji = idx === emojiList.length - 1;

          if (isLastEmoji) {
            return (
              <EmojiLabel
                key={id}
                isActive={id === myEmojiId}
                py="0.5rem"
                px="0.75rem"
                onClick={() => onClickEmoji(id)}
                onBlur={() => changeHoverState(false)}
              >
                {emoji}
              </EmojiLabel>
            );
          }

          return (
            <EmojiLabel
              key={id}
              isActive={id === myEmojiId}
              py="0.5rem"
              px="0.75rem"
              onClick={() => onClickEmoji(id)}
            >
              {emoji}
            </EmojiLabel>
          );
        })}
      </EmojiModalWrapper>
    </EmojiModalLayout>
  );
};

export default EmojiModal;
