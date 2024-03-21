import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const ReplyListLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;

  background-color: ${theme.palette.green100};
`;

const MoreButton = styled.button`
  margin: auto;

  background-color: transparent;

  ${theme.font.button.weak}
  color: ${theme.palette.gray600};

  cursor: pointer;
`;

export { ReplyListLayout, MoreButton };
