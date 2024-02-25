export const comments = Array.from({ length: 120 }, (_, idx) => {
  return {
    id: idx + 1,
    content: '아자아자 홧팅이다!',
    commenterId: 1,
    commenterName: 'aken-you',
    commenterProfileUrl: 'https://avatars.githubusercontent.com/u/96980857?v=4',
    createdAt: '2024-01-23 10:34:50',
    emojis: [
      {
        id: 1,
        count: 1,
      },
      {
        id: 4,
        count: 1,
      },
    ],
    myEmojiId: 4,
  };
});
