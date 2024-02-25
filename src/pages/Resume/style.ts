import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const Main = styled.main`
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
`;

const MainHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 0.25rem;
    align-items: start;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${theme.font.body.default}
  color: ${theme.color.neutral.text.default};
`;

const ResumeList = styled.ul`
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

export { Main, MainHeader, FilterContainer, Filter, ResumeList };
