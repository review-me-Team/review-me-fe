import styled from 'styled-components';

const ReplyFormLayout = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.5rem;

  & > button {
    flex-shrink: 0;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  width: 100%;
`;

export { ReplyFormLayout, ButtonsContainer };
