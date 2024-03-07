import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const ReplyForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.5rem;

  & > button {
    flex-shrink: 0;
  }
`;

const ReplyListLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;

  background-color: ${theme.palette.green100};
`;

export { ReplyForm, ReplyListLayout };
