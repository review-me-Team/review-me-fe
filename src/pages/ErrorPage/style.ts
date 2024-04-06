import { theme } from 'review-me-design-system';
import styled from 'styled-components';
import { breakPoints } from '@styles/common';

const ErrorPageLayout = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 100vh;
  margin: auto;

  @media ${breakPoints.mobile} {
    width: 90%;
  }
`;

const ErrorSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  padding: 1rem;
  gap: 2rem;

  background-color: ${theme.color.neutral.bg.default};
  border-radius: 1rem;
  box-shadow: 0 0 1.5rem -0.25rem rgba(16, 24, 40, 0.08);
`;

const Title = styled.h1`
  ${theme.font.title.medium}
`;

const Description = styled.h3`
  ${theme.font.body.medium}
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export { ErrorPageLayout, ErrorSection, Title, Description, ButtonContainer };
