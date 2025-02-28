import { theme } from 'review-me-design-system';
import { createGlobalStyle } from 'styled-components';
import { breakPoints } from './common';

export const GlobalStyle = createGlobalStyle`
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
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
  button {
    background: none;
  }

  .visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  } 
`;
