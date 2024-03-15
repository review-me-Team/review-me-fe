import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const QuestionFormLayout = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;

  box-shadow: rgba(0, 0, 0, 0.07) 0 0 1.25rem;
`;

const LabelList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const KeywordLabel = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 1.5rem;
  padding: 0 1rem;

  background: ${theme.palette.green300};
  border-radius: 1rem;

  ${theme.font.body.weak}
  color: ${theme.color.neutral.text.default}
`;

export { QuestionFormLayout, LabelList, ButtonWrapper, KeywordLabel };
