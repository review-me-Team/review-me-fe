import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 7.5rem;

  color: ${theme.color.neutral.text.default};
  ${theme.font.body.default}
`;

export { Description, Form, Field, Label };
