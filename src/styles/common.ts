import type { CSSProp } from 'styled-components';
import styled, { css, keyframes } from 'styled-components';

export const ellipsisStyles = css`
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

export const screenSize = {
  mobile: 600,
  smallTablet: 768,
  tablet: 1199,
  desktop: 1200,
};

export const breakPoints = {
  mobile: `screen and (max-width: ${screenSize.mobile}px)`,
  smallTablet: `screen and (max-width: ${screenSize.smallTablet}px)`,
  tablet: `screen and (max-width: ${screenSize.tablet}px)`,
  desktop: `screen and (min-width: ${screenSize.desktop}px)`,
};

export const PageMain = styled.main<{ $css?: CSSProp }>`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media ${breakPoints.desktop} {
    width: 80%;
    margin: 2rem auto;
  }
  @media ${breakPoints.tablet} {
    width: 80%;
    margin: 1rem auto;
  }
  @media ${breakPoints.mobile} {
    width: 90%;
    margin: 0.5rem auto;
  }

  ${({ $css }) => $css}
`;

export const fadeIn = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`;
