import styled from 'styled-components';

const YearRangeFilterLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
  width: 100%;
  height: fit-content;
  padding: 0.75rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export { YearRangeFilterLayout, ButtonsContainer };
