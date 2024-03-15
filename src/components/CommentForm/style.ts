import styled from 'styled-components';

const CommentFormLayout = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.75rem 1rem;

  box-shadow: rgba(0, 0, 0, 0.07) 0 0 1.25rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export { CommentFormLayout, ButtonWrapper };
