import React from 'react';
import type { Preview } from '@storybook/react';
import { ReviewMeProvider } from 'review-me-design-system';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

export const decorators = [
  (Story) => (
    <ReviewMeProvider>
      <Story />
    </ReviewMeProvider>
  ),
];
