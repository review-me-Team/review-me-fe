import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginButton = styled.button`
  display: flex;
  padding: 0.75rem 1.5rem;
  justify-content: center;
  align-items: center;

  background-color: ${theme.palette.black};
  border-radius: 0.75rem;

  color: ${theme.color.neutral.text.weak};
  ${theme.font.button.default}

  cursor: pointer;
`;

export { DescriptionContainer, LoginButton };
