import { Question } from '@apis/questionApi';

const firstResumePageQuestions: Question[] = Array.from({ length: 20 }, (_, idx) => {
  return {
    id: idx + 1,
    content: '프로젝트에서 react-query를 사용하셨는데 사용한 이유가 궁금합니다.',
    commenterId: 1,
    commenterName: 'aken-you',
    commenterProfileUrl: 'https://avatars.githubusercontent.com/u/96980857?v=4',
    labelContent: 'react-query',
    createdAt: '2024-01-27T15:43:09.752Z',
    countOfReplies: 10,
    checked: false,
    emojis: [
      {
        id: 1,
        count: 10,
      },
    ],
    myEmojiId: 1,
  };
});

const secondResumePageQuestions: Question[] = Array.from({ length: 20 }, (_, idx) => {
  return {
    id: idx + 21,
    content: '팀원과 협업 중 의견 충돌이 생겼을 때 어떻게 해결하셨나요?',
    commenterId: 1,
    commenterName: 'aken-you',
    commenterProfileUrl: 'https://avatars.githubusercontent.com/u/96980857?v=4',
    labelContent: 'react-query',
    createdAt: '2024-01-27T15:43:09.752Z',
    countOfReplies: 10,
    checked: false,
    emojis: [
      {
        id: 1,
        count: 10,
      },
    ],
    myEmojiId: 1,
  };
});

const thirdResumePageQuestions: Question[] = [];

const fourthResumePageQuestions: Question[] = [];

export const questions: Record<string, Question[]> = {
  1: firstResumePageQuestions,
  2: secondResumePageQuestions,
  3: thirdResumePageQuestions,
  4: fourthResumePageQuestions,
};
