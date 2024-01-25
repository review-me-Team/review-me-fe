import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 3.75rem);

  background-color: ${theme.color.neutral.bg.default};
`;

const ResumeContentWrapper = styled.section`
  display: flex;
  flex-direction: row;
  height: 100%;
  margin: 0 auto;
`;

// * Main 상단: Resume에 대한 정보
const ResumeViewer = styled.section`
  display: flex;
  flex-direction: column;
  width: 60%;
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

  @media screen and (max-width: 600px) {
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

  @media screen and (max-width: 600px) {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Career = styled.span`
  color: ${theme.palette.green600};
`;

// * Main 중간: pdf, 피드백, 예상질문

const FeedbackAndQuestion = styled.aside`
  display: flex;
  flex-direction: column;
  width: 40%;
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

const FeedbackForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.75rem 1rem;

  box-shadow: rgba(0, 0, 0, 0.07) 0 0 1.25rem;
`;

const LabelList = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FeedbackFormContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.5rem;

  & > button {
    flex-shrink: 0;
  }
`;

const ReplyForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.5rem;

  & > button {
    flex-shrink: 0;
  }
`;

const QuestionForm = styled.form``;

// * 댓글 관련
const CommentList = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
`;

const ReplyList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  padding-bottom: 0.75rem;

  background-color: ${theme.palette.green100};
`;

// * Main 하단: 댓글

const CommentForm = styled.form``;

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
  FeedbackAndQuestion,
  TabList,
  Tab,
  FeedbackForm,
  FeedbackFormContent,
  LabelList,
  CommentList,
  ReplyList,
  ReplyForm,
  CommentForm,
};
