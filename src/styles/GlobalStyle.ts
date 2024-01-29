import { theme } from 'review-me-design-system';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    overflow: visible;
    min-height: 100%;
    background-color: ${theme.color.neutral.bg.light};
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;
