import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const Description = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const GuideSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const SubDescription = styled.span`
  ${theme.font.body.weak}
  color: ${theme.color.neutral.text.sub};
`;

const Video = styled.video`
  width: 100%;
  max-width: 600px;
`;

export { Description, ButtonContainer, GuideSection, SubDescription, Video };
