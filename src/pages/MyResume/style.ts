import { theme } from 'review-me-design-system';
import styled from 'styled-components';
import { breakPoints } from '@styles/common';

const MyResumeLayout = styled.div`
  background-color: ${theme.color.neutral.bg.light};
`;

const MyResumeList = styled.ul`
  display: grid;
  width: 100%;

  @media ${breakPoints.desktop} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.5rem;
  }
  @media ${breakPoints.tablet} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }
  @media ${breakPoints.mobile} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem 0.625rem;
  }
`;

export { MyResumeLayout, MyResumeList };
