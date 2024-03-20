import type { CSSProp } from 'styled-components';
import styled, { css } from 'styled-components';

export const ellipsisStyles = css`
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

export const breakPoints = {
  mobile: `(max-width: 600px)`,
  tablet: `(max-width: 1119px)`,
  desktop: `(min-width: 1200px)`,
};

export const PageMain = styled.main<{ $css?: CSSProp }>`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 80%;
  margin: 2rem auto;

  @media screen and (max-width: 1280px) {
    width: 80%;
    margin: 1rem auto;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 0.5rem auto;
  }

  ${({ $css }) => $css}
`;
