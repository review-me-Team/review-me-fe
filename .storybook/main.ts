import type { StorybookConfig } from '@storybook/react-webpack5';
const path = require('path');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@pages': path.resolve(__dirname, '../src/pages'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@assets': path.resolve(__dirname, '../src/assets'),
        '@styles': path.resolve(__dirname, '../src/styles'),
        '@contexts': path.resolve(__dirname, '../src/contexts'),
        '@hooks': path.resolve(__dirname, '../src/hooks'),
        '@utils': path.resolve(__dirname, '../src/utils'),
        '@constants': path.resolve(__dirname, '../src/constants'),
      };
    }

    return config;
  },
};
export default config;
