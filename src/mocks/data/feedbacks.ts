import { Feedback } from '@apis/feedbackApi';

const firstResumePageFeedbacks: Feedback[] = Array.from({ length: 20 }, (_, idx) => {
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
        id: 1,
        count: 1,
      },
      {
        id: 2,
        count: 1,
      },
      {
        id: 3,
        count: 0,
      },
      {
        id: 4,
        count: 0,
      },
      {
        id: 5,
        count: 0,
      },
    ],
    myEmojiId: 2,
  };
});

const secondResumePageFeedbacks: Feedback[] = Array.from({ length: 20 }, (_, idx) => {
  return {
    id: idx + 21,
    content: '협업과 관련된 내용이 추가되었으면 좋겠어요',
    commenterId: 2,
    commenterName: 'acceptor-gyu',
    commenterProfileUrl: 'https://avatars.githubusercontent.com/u/71162390?v=4',
    labelContent: '협업',
    createdAt: '2024-02-21 14:56:21',
    countOfReplies: 0,
    checked: false,
    emojis: [
      {
        id: 1,
        count: 1,
      },
      {
        id: 2,
        count: 0,
      },
      {
        id: 3,
        count: 0,
      },
      {
        id: 4,
        count: 0,
      },
      {
        id: 5,
        count: 0,
      },
    ],
    myEmojiId: null,
  };
});

const thirdResumePageFeedbacks: Feedback[] = Array.from({ length: 20 }, (_, idx) => {
  return {
    id: idx + 41,
    content: '문제 해결 과정이 잘 드러나지 않은 것 같습니다',
    commenterId: 2,
    commenterName: 'acceptor-gyu',
    commenterProfileUrl: 'https://avatars.githubusercontent.com/u/71162390?v=4',
    labelContent: '',
    createdAt: '2024-02-21 14:56:21',
    countOfReplies: 0,
    checked: false,
    emojis: [
      {
        id: 1,
        count: 0,
      },
      {
        id: 2,
        count: 0,
      },
      {
        id: 3,
        count: 0,
      },
      {
        id: 4,
        count: 0,
      },
      {
        id: 5,
        count: 1,
      },
    ],
    myEmojiId: null,
  };
});

const fourthResumePageFeedbacks: Feedback[] = [];

export const feedbacks: Record<string, Feedback[]> = {
  1: firstResumePageFeedbacks,
  2: secondResumePageFeedbacks,
  3: thirdResumePageFeedbacks,
  4: fourthResumePageFeedbacks,
};
