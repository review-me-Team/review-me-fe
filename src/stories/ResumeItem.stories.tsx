import type { Meta, StoryObj } from '@storybook/react';

// import React from 'react';
import ResumeItem from '@components/ResumeItem';

const meta: Meta<typeof ResumeItem> = {
  title: 'ResumeItem',
  component: ResumeItem,
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: '이력서 id',
    },
    title: {
      description: '이력서 제목',
    },
    writerName: {
      description: '이력서 작성자 이름',
    },
    writerProfileUrl: {
      description: '이력서 작성자 이미지',
    },
    year: {
      description: '경력',
    },
    occupation: {
      description: '직군',
    },
    createdAt: {
      description: '이력서 생성 날짜',
    },
  },
  args: {},
};

export default meta;

type Story = StoryObj<typeof ResumeItem>;

export const Default: Story = {
  args: {
    id: 1,
    title: '이력서',
    writerName: 'aken-you',
    writerProfileUrl: 'https://avatars.githubusercontent.com/u/96980857?v=4',
    year: 0,
    occupation: 'DevOps System Engineer',
    createdAt: '2023-12-22 15:16:42',
  },
};
