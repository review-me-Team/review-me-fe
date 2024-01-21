import type { Meta, StoryObj } from '@storybook/react';

// import React from 'react';
import Comment from '@components/Comment';

const meta: Meta<typeof Comment> = {
  title: 'Comment',
  component: Comment,
  tags: ['autodocs'],
  argTypes: {
    content: {
      description: '댓글 내용',
    },
    writerId: {
      description: '댓글 작성자의 id',
    },
    writerName: {
      description: '댓글 작성자',
    },
    writerProfileUrl: {
      description: '댓글 작성자의 이미지',
    },
    labelContent: {
      description: '피드백 카테고리 또는 예상질문 키워드',
    },
    createdAt: {
      description: '댓글 생성 시간',
    },
    emojis: {
      description: '댓글의 이모지 개수',
    },
    myEmojiId: {
      description: '사용자가 고른 이모지 id',
    },
  },
  args: {},
};

export default meta;

type Story = StoryObj<typeof Comment>;

export const FeedbackComment: Story = {
  args: {
    content: '뭔가 이력서에 문제 해결과 관련된 내용이 부족한 것같아요.',
    writerId: 1,
    writerName: 'aken-you',
    writerProfileUrl: 'https://avatars.githubusercontent.com/u/96980857?v=4',
    labelContent: '프로젝트',
    createdAt: '2024-01-21T09:40:02.551Z',
    countOfReplies: 10,
    checked: true,
    emojis: [
      {
        id: 1,
        count: 10,
      },
    ],
    myEmojiId: 1,
  },
};

export const FeedbackReply: Story = {
  args: {
    // feedbackId: 1,
    content: '저도 그렇게 느껴지긴 했는데 조금 더 보완해야겠네요. 감사합니다!',
    writerName: 'aken-you',
    writerProfileUrl: 'https://avatars.githubusercontent.com/u/96980857?v=4',
    createdAt: '2024-01-21T09:55:53.234Z',
    emojis: [
      {
        id: 1,
        count: 10,
      },
    ],
    myEmojiId: 1,
  },
};

export const QuestionComment: Story = {
  args: {
    content: '프로젝트에서 react-query를 사용하셨는데 사용한 이유가 궁금합니다.',
    writerId: 1,
    writerName: 'aken-you',
    writerProfileUrl: 'https://avatars.githubusercontent.com/u/96980857?v=4',
    labelContent: 'react-query',
    createdAt: '2024-01-21T09:35:26.384Z',
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
  },
};

export const QuestionReply: Story = {
  args: {
    // questionId: 1,
    content: '흠.. 그러게요... 조금 더 공부해보겠습니다!',
    writerId: 1,
    writerName: 'aken-you',
    writerProfileUrl: 'https://avatars.githubusercontent.com/u/96980857?v=4',
    createdAt: '2024-01-21T09:56:49.061Z',
    emojis: [
      {
        id: 1,
        count: 10,
      },
    ],
    myEmojiId: 1,
  },
};
