import React, { MouseEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from 'review-me-design-system';
import ButtonGroup from '@components/ButtonGroup';
import Comment from '@components/Comment';
import CommentForm from '@components/CommentForm';
import FeedbackForm from '@components/FeedbackForm';
import PdfViewer from '@components/PdfViewer';
import QuestionForm from '@components/QuestionForm';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import usePdf from '@hooks/usePdf';
import { useUserContext } from '@contexts/userContext';
import { useCommentList } from '@apis/commentApi';
import { useFeedbackList } from '@apis/feedbackApi';
import { useQuestionList } from '@apis/questionApi';
import { useResumeDetail } from '@apis/resumeApi';
import {
  Career,
  CommentList,
  FeedbackAndQuestion,
  Main,
  ResumeContentWrapper,
  ResumeInfo,
  ResumeViewerHeader,
  Tab,
  TabList,
  Title,
  WriterImg,
  WriterInfo,
  WriterInfoContainer,
  ResumeViewer,
} from './style';

type ActiveTab = 'feedback' | 'question' | 'comment';

const ResumeDetail = () => {
  const { jwt, isLoggedIn } = useUserContext();
  const { resumeId } = useParams();

  const { data: resumeDetail } = useResumeDetail({ resumeId: Number(resumeId), jwt });

  const PDF_BUTTON_ICON_SIZE = 24;

  const { totalPages, currentPageNum, scale, setTotalPages, zoomIn, zoomOut, prevPage, nextPage } = usePdf(
    {},
  );

  const [currentTab, setCurrentTab] = useState<ActiveTab>('feedback');

  const enabledAboutFeedbackList = isLoggedIn
    ? currentTab === 'feedback' && !!jwt
    : currentTab === 'feedback';

  const { data: feedbackListData, fetchNextPage: fetchNextPageAboutFeedback } = useFeedbackList({
    resumeId: Number(resumeId),
    resumePage: currentPageNum,
    enabled: enabledAboutFeedbackList,
    jwt,
  });
  const { data: questionListData, fetchNextPage: fetchNextPageAboutQuestion } = useQuestionList({
    resumeId: Number(resumeId),
    resumePage: currentPageNum,
    enabled: currentTab === 'question',
    jwt,
  });
  const { data: commentListData, fetchNextPage: fetchNextPageAboutComment } = useCommentList({
    resumeId: Number(resumeId),
    enabled: currentTab === 'comment',
    jwt,
  });

  const feedbackList = feedbackListData?.pages.map((page) => page.feedbacks).flat();
  const questionList = questionListData?.pages.map((page) => page.questions).flat();
  const commentList = commentListData?.pages.map((page) => page.comments).flat();

  const { setTarget } = useIntersectionObserver({
    onIntersect: () => {
      if (currentTab === 'feedback') fetchNextPageAboutFeedback();
      else if (currentTab === 'question') fetchNextPageAboutQuestion();
      else if (currentTab === 'comment') fetchNextPageAboutComment();
    },
    options: {
      threshold: 0.5,
    },
  });

  const handleTabClick = (e: MouseEvent<HTMLButtonElement>, tab: ActiveTab) => {
    setCurrentTab(tab);
  };

  return (
    <Main>
      <ResumeContentWrapper>
        <ResumeViewer>
          <ResumeViewerHeader>
            <ResumeInfo>
              <Title>{resumeDetail?.title}</Title>

              <WriterInfoContainer>
                <WriterImg src={resumeDetail?.writerProfileUrl} />
                <WriterInfo>
                  <span>{resumeDetail?.writerName}</span>
                  <Career>
                    {resumeDetail?.occupation} |{' '}
                    {resumeDetail?.year === 0 ? '신입' : `${resumeDetail?.year}년차`}
                  </Career>
                </WriterInfo>
              </WriterInfoContainer>
            </ResumeInfo>
          </ResumeViewerHeader>

          <PdfViewer
            showAllPages={false}
            file={resumeDetail?.resumeUrl}
            totalPages={totalPages}
            scale={scale}
            pageNum={currentPageNum}
            onLoadSuccess={setTotalPages}
            width="100%"
            height="100%"
          >
            <PdfViewer.PdfPagesInfo>
              current: {currentPageNum} / {totalPages}
            </PdfViewer.PdfPagesInfo>
            <ButtonGroup height="2rem">
              <ButtonGroup.Button onClick={prevPage}>
                <Icon iconName="leftArrow" width={PDF_BUTTON_ICON_SIZE} height={PDF_BUTTON_ICON_SIZE} />
              </ButtonGroup.Button>
              <ButtonGroup.Button onClick={zoomIn}>
                <Icon iconName="plus" width={PDF_BUTTON_ICON_SIZE} height={PDF_BUTTON_ICON_SIZE} />
              </ButtonGroup.Button>
              <ButtonGroup.Button onClick={zoomOut}>
                <Icon iconName="minus" width={PDF_BUTTON_ICON_SIZE} height={PDF_BUTTON_ICON_SIZE} />
              </ButtonGroup.Button>
              <ButtonGroup.Button onClick={nextPage}>
                <Icon iconName="rightArrow" width={PDF_BUTTON_ICON_SIZE} height={PDF_BUTTON_ICON_SIZE} />
              </ButtonGroup.Button>
            </ButtonGroup>
          </PdfViewer>
        </ResumeViewer>

        <FeedbackAndQuestion>
          <TabList>
            <Tab $isActive={currentTab === 'feedback'} onClick={(e) => handleTabClick(e, 'feedback')}>
              피드백
            </Tab>
            <Tab $isActive={currentTab === 'question'} onClick={(e) => handleTabClick(e, 'question')}>
              예상질문
            </Tab>
            <Tab $isActive={currentTab === 'comment'} onClick={(e) => handleTabClick(e, 'comment')}>
              댓글
            </Tab>
          </TabList>

          <CommentList>
            {currentTab === 'feedback' &&
              feedbackList?.map((feedback) => {
                return (
                  <li key={feedback.id}>
                    <Comment
                      type="feedback"
                      resumeId={Number(resumeId)}
                      resumePage={currentPageNum}
                      {...feedback}
                    />
                  </li>
                );
              })}
            {currentTab === 'question' &&
              questionList?.map((question) => {
                return (
                  <li key={question.id}>
                    <Comment
                      type="question"
                      resumeId={Number(resumeId)}
                      resumePage={currentPageNum}
                      {...question}
                    />
                  </li>
                );
              })}
            {currentTab === 'comment' &&
              commentList?.map((comment) => {
                return (
                  <li key={comment.id}>
                    <Comment
                      type="comment"
                      resumeId={Number(resumeId)}
                      resumePage={currentPageNum}
                      {...comment}
                    />
                  </li>
                );
              })}
            <div ref={setTarget}></div>
          </CommentList>

          {currentTab === 'feedback' && resumeId && (
            <FeedbackForm resumeId={Number(resumeId)} currentPageNum={currentPageNum} />
          )}
          {currentTab === 'question' && resumeId && (
            <QuestionForm resumeId={Number(resumeId)} currentPageNum={currentPageNum} />
          )}
          {currentTab === 'comment' && resumeId && <CommentForm resumeId={Number(resumeId)} />}
        </FeedbackAndQuestion>
      </ResumeContentWrapper>
    </Main>
  );
};

export default ResumeDetail;
