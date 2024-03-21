import { theme } from 'review-me-design-system';
import styled from 'styled-components';
import { breakPoints } from '@styles/common';

const Main = styled.main<{ $isMobile: boolean }>`
  width: 100%;
  height: calc(${({ $isMobile }) => ($isMobile ? '100%' : '100vh')} - 3.75rem);

  background-color: ${theme.color.neutral.bg.default};
`;

const ResumeContentWrapper = styled.section<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  height: 100%;
  margin: 0 auto;
`;

// * Main 상단: Resume에 대한 정보
const ResumeViewer = styled.section<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '60%')};
`;

const ResumeViewerHeader = styled.header`
  width: 100%;

  background-color: ${theme.color.neutral.bg.default};
`;

const ResumeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding: 0.5rem 0;
  margin: 0 auto;

  @media ${breakPoints.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.span`
  margin-right: 0.25rem;

  ${theme.font.title.default}
  color: ${theme.color.neutral.text.strong};
`;

const WriterInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const WriterImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;

  border-radius: 50%;
  border: 0.0625rem solid ${theme.color.accent.bd.strong};
`;

const WriterInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  ${theme.font.body.weak}
  color: ${theme.color.neutral.text.strong};

  @media ${breakPoints.mobile} {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Career = styled.span`
  color: ${theme.palette.green600};
`;

// * Main 중간: pdf, 피드백, 예상질문

const ResumeDetailAside = styled.aside<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '40%')};
`;

const TabList = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem;
`;

const Tab = styled.button<{ $isActive: boolean }>`
  background-color: transparent;

  ${theme.font.title.default}
  color: ${({ $isActive }) => theme.color.neutral.text[$isActive ? 'strong' : 'sub']};

  cursor: pointer;
`;

// * 댓글 관련
const CommentList = styled.ul<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: ${({ $isMobile }) => ($isMobile ? '43.75rem' : '100%')};
`;

export {
  Main,
  ResumeViewer,
  ResumeViewerHeader,
  ResumeInfo,
  Title,
  WriterInfoContainer,
  WriterImg,
  WriterInfo,
  Career,
  ResumeContentWrapper,
  ResumeDetailAside,
  TabList,
  Tab,
  CommentList,
};
