import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: fit-content;

  background-color: transparent;

  ${theme.font.body.default}
  color: ${theme.color.neutral.text.default};

  cursor: pointer;
`;

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

export { IconButton, ResumeUploadContainer, Description, MainDescription, SubDescription };
