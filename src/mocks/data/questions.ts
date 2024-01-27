export const questions = Array.from({ length: 120 }, (_, idx) => {
  return {
    id: idx + 1,
    content: '프로젝트에서 react-query를 사용하셨는데 사용한 이유가 궁금합니다.',
    commenterId: 1,
    commenterName: 'aken-you',
    commenterProfileUrl: 'https://avatars.githubusercontent.com/u/96980857?v=4',
    labelContent: 'react-query',
    createdAt: '2024-01-27T15:43:09.752Z',
    countOfReplies: 10,
    bookmarked: true,
    checked: true,
    emojis: [
      {
        id: 1,
        count: 10,
      },
    ],
    myEmojiId: 1,
  };
});
