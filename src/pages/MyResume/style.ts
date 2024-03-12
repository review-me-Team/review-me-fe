import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const MyResumeLayout = styled.div`
  background-color: ${theme.color.neutral.bg.light};
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  min-height: calc(100vh - 4rem);

  @media screen and (max-width: 500px) {
    padding: 0.625rem;
  }
`;

const MyResumeList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
  width: 100%;

  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem 0.625rem;
  }
`;

export { MyResumeLayout, Main, MyResumeList };
