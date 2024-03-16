import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const SelectLayout = styled.select<{ $width: string }>`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  width: ${({ $width }) => $width};
  padding: 0.5rem 0.75rem;

  background-color: ${theme.color.neutral.bg.default};
  border-radius: 0.25rem;
  border: 0.0625rem solid ${theme.color.accent.bd.weak};

  ${({ theme }) => theme.font.body.default}
  color: ${({ theme }) => theme.color.neutral.text.default};

  &:focus {
    outline: none;
    border-color: ${theme.color.accent.bd.strong};
  }
`;

export { SelectLayout };
