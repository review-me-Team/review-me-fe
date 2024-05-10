import { theme } from 'review-me-design-system';
import { createGlobalStyle } from 'styled-components';
import { breakPoints } from './common';

export const GlobalStyle = createGlobalStyle`
  @media ${breakPoints.smallTablet} {
    html {
      font-size: 87.5%;
    }
  }
  body {
    overflow: auto;
    min-height: 100%;
    background-color: ${theme.color.neutral.bg.light};
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;
