import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const IconButton = styled.button`
  background-color: transparent;

  cursor: pointer;
`;

const UserList = styled.ul`
  width: 100%;
  max-height: 28.875rem;
  overflow-y: auto;
`;

const SearchUserInstruction = styled.span`
  ${theme.font.body.medium}
  color: ${theme.color.neutral.text.sub}
`;

export { Header, IconButton, UserList, SearchUserInstruction };
