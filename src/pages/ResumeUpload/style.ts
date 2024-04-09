import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const ResumeUploadContainer = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  gap: 1rem;

  border-radius: 1rem;
  background-color: ${theme.color.neutral.bg.default};
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

export { ResumeUploadContainer, Description, MainDescription, SubDescription };
