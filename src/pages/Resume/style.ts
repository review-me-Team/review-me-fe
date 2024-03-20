import { theme } from 'review-me-design-system';
import styled from 'styled-components';

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

const FilterContainer = styled.div<{ $isMDevice: boolean }>`
  display: flex;
  flex-direction: ${({ $isMDevice }) => ($isMDevice ? 'column' : 'row')};
  align-items: center;
  gap: 0.75rem;
`;

const Filter = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${theme.font.body.default}
  color: ${theme.color.neutral.text.default};
`;

const YearRange = styled.button`
  display: flex;
  position: relative;
  width: 10.25rem;
  padding: 0.5rem 0.75rem;

  background-color: ${theme.color.neutral.bg.default};
  border-radius: 0.25rem;
  border: 0.0625rem solid ${theme.color.accent.bd.weak};

  ${({ theme }) => theme.font.body.default}
  color: ${({ theme }) => theme.color.neutral.text.default};
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

export { MainHeader, FilterContainer, Filter, YearRange, ResumeList };
