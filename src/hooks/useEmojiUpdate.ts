type Emoji = {
  id: number;
  count: number;
};

const useEmojiUpdate = () => {
  const updateEmojiCount = ({
    emoji,
    clickedEmojiId,
    myEmojiId,
  }: {
    emoji: Emoji;
    clickedEmojiId: number;
    myEmojiId: number | null;
  }) => {
    const shouldDeleteEmoji = myEmojiId === clickedEmojiId;
    const isSelected = emoji.id === clickedEmojiId;
    const isPreviouslySelected = emoji.id === myEmojiId;

    if (isSelected) {
      return {
        ...emoji,
        count: shouldDeleteEmoji ? emoji.count - 1 : emoji.count + 1,
      };
    }
    if (isPreviouslySelected) {
      return {
        ...emoji,
        count: shouldDeleteEmoji ? emoji.count : emoji.count - 1,
      };
    }

    return { ...emoji };
  };

  const updateEmojis = <T extends { id: number; emojis: Emoji[]; myEmojiId: number | null }>({
    data,
    id,
    clickedEmojiId,
    myEmojiId,
  }: {
    data: T;
    id: number;
    clickedEmojiId: number;
    myEmojiId: number | null;
  }) => {
    const isPreviouslySelected = typeof myEmojiId === 'number';
    const shouldDeleteEmoji = isPreviouslySelected && myEmojiId === clickedEmojiId;

    if (data.id === id) {
      return {
        ...data,
        emojis: data.emojis.map((emoji) => updateEmojiCount({ emoji, clickedEmojiId, myEmojiId })),
        myEmojiId: shouldDeleteEmoji ? null : clickedEmojiId,
      };
    }

    return { ...data };
  };

  return { updateEmojis };
};

export default useEmojiUpdate;
