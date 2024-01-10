import type { Meta, StoryObj } from '@storybook/react';

// import React from 'react';
import MyResumeItem from '@components/MyResumeItem';

const meta: Meta<typeof MyResumeItem> = {
  title: 'MyResumeItem',
  component: MyResumeItem,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: '이력서 제목',
    },
    year: {
      description: '경력',
    },
    occupation: {
      description: '직군',
    },
    scope: {
      description: '이력서 공개 범위',
    },
    createdAt: {
      description: '이력서 생성 날짜',
    },
  },
  args: {},
};

export default meta;

type Story = StoryObj<typeof MyResumeItem>;

export const Default: Story = {
  args: {
    title: '이력서',
    year: 0,
    occupation: 'DevOps System Engineer',
    scope: '전체 공개',
    createdAt: '2023-12-22 15:16:42',
  },
};
