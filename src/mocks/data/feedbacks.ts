export const feedbacks = Array.from({ length: 120 }, (_, idx) => {
  return {
    id: idx + 1,
    content: '뭔가 이력서에 문제 해결과 관련된 내용이 부족한 것같아요.',
    commenterId: 2,
    commenterName: 'acceptor-gyu',
    commenterProfileUrl: 'https://avatars.githubusercontent.com/u/71162390?v=4',
    labelContent: '자기소개',
    createdAt: '2023-12-22 15:46:05',
    countOfReplies: 0,
    checked: false,
    emojis: [
      {
        id: 2,
        count: 2,
      },
      {
        id: 3,
        count: 1,
      },
    ],
    myEmojiId: 2,
  };
});
