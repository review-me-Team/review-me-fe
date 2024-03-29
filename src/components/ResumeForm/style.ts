import { theme } from 'review-me-design-system';
import styled from 'styled-components';
import { breakPoints } from '@styles/common';

const ResumeFormLayout = styled.div<{ $width?: string }>`
  display: flex;
  width: 100%;

  @media ${breakPoints.mobile} {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 45%;
  margin-left: 1rem;

  @media ${breakPoints.mobile} {
    width: 100%;
    gap: 0.5rem;
    margin-left: 0;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const MainDescription = styled.span`
  ${theme.font.title.medium}
  color: ${theme.color.neutral.text.strong};
`;

const SubDescription = styled.span`
  ${theme.font.body.default}
  color: ${theme.color.neutral.text.strong}
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  width: 6.5rem;

  color: ${theme.color.neutral.text.default};
  ${theme.font.body.default}
`;

const FileLabel = styled.label`
  display: flex;
  padding: 0.5rem 0.75rem;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;

  border-radius: 0.75rem;
  border: 1px solid ${theme.color.accent.bd.strong};
  background: ${theme.color.neutral.bg.default};

  color: ${theme.color.accent.text.strong};
  ${theme.font.button.weak}
`;

export {
  ResumeFormLayout,
  Form,
  FieldContainer,
  Description,
  MainDescription,
  SubDescription,
  Field,
  Label,
  FileLabel,
};
