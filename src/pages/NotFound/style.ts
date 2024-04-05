import { theme } from 'review-me-design-system';
import styled from 'styled-components';
import { breakPoints } from '@styles/common';

const NotFoundLayout = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 100vh;
  margin: auto;

  @media ${breakPoints.mobile} {
    width: 90%;
  }
`;

const NotFoundSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  padding: 1rem;
  gap: 1rem;

  background-color: ${theme.color.neutral.bg.default};
  border-radius: 1rem;
  box-shadow: 0 0 1.5rem -0.25rem rgba(16, 24, 40, 0.08);
`;

const Title = styled.h1`
  ${theme.font.title.strong}
`;

const Description = styled.h3`
  ${theme.font.title.default}
`;

export { NotFoundLayout, NotFoundSection, Title, Description };
