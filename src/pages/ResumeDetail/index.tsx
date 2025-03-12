import React, { MouseEvent, Suspense, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePrefetchQuery } from '@tanstack/react-query';
import { Icon, Switch, theme } from 'review-me-design-system';
import ButtonGroup from '@components/ButtonGroup';
import Comment from '@components/Comment';
import CommentAddForm from '@components/CommentForm/CommentAddForm';
import DelayedComponent from '@components/DelayedComponent';
import Feedback from '@components/Feedback';
import FeedbackAddForm from '@components/FeedbackForm/FeedbackAddForm';
import PdfViewer from '@components/PdfViewer';
import Question from '@components/Question';
import QuestionAddForm from '@components/QuestionForm/QuestionAddForm';
import Spinner from '@components/Spinner';
import useGuideBook from '@hooks/useGuideBook';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useMediaQuery from '@hooks/useMediaQuery';
import usePdf from '@hooks/usePdf';
import { useUserContext } from '@contexts/userContext';
import { useCommentList } from '@apis/commentApi';
import { useFeedbackList } from '@apis/feedbackApi';
import { useQuestionList } from '@apis/questionApi';
import { GetResumeDetail, useResumeDetail } from '@apis/resumeApi';
import { getEmojiList, getFeedbackLabelList } from '@apis/utilApi';
import { breakPoints } from '@styles/common';
import { IconButton } from '@styles/iconButton';
import { isNumeric } from '@utils';
import {
  Career,
  CommentList,
  Aside,
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
  CommentHeader,
  SwitchContainer,
  AsideHeader,
  TitleContainer,
  CommentListWrapper,
  EmptyListNotification,
  SpinnerWrapper,
} from './style';

type ActiveTab = 'feedback' | 'question' | 'comment';

const ResumeDetail = () => {
  const { jwt, user } = useUserContext();
  const { resumeId } = useParams();

  const { matches: isMobile } = useMediaQuery({ mediaQueryString: breakPoints.mobile });

  usePrefetchQuery({
    queryKey: ['emojiList'],
    queryFn: getEmojiList,
  });
  usePrefetchQuery({
    queryKey: ['feedbackLabelList'],
    queryFn: getFeedbackLabelList,
  });

  const { data: resumeDetail } = useResumeDetail({ resumeId: Number(resumeId), jwt });

  const { totalPages, currentPageNum, scale, setTotalPages, zoomIn, zoomOut, prevPage, nextPage } = usePdf({
    initScale: isMobile ? 0.6 : 1,
  });

  const [currentTab, setCurrentTab] = useState<ActiveTab>('feedback');

  const [filter, setFilter] = useState<{ checked: boolean; bookmarked: boolean }>({
    checked: false,
    bookmarked: false,
  });

  const handleTabClick = (e: MouseEvent<HTMLButtonElement>, tab: ActiveTab) => {
    setCurrentTab(tab);
    setFilter({ checked: false, bookmarked: false });
  };

  const isMyResume = resumeDetail.writerId === user?.id;
  const isValidResumeId = isNumeric(resumeId);

  const { openGuideBook } = useGuideBook();

  return (
    <Main>
      <ResumeContentWrapper>
        <ResumeViewer>
          <ResumeViewerHeader>
            <ResumeInfo>
              <TitleContainer>
                {isMyResume && <PdfLink resumeUrl={resumeDetail.resumeUrl} title={resumeDetail.title} />}
                <Title>{resumeDetail.title}</Title>
              </TitleContainer>

              <WriterInfoContainer>
                <WriterImg src={resumeDetail.writerProfileUrl} alt={resumeDetail.writerName} />
                <WriterInfo>
                  <span>{resumeDetail.writerName}</span>
                  <Career>
                    {resumeDetail.occupation} |{' '}
                    {resumeDetail.year === 0 ? '신입' : `${resumeDetail.year}년차`}
                  </Career>
                </WriterInfo>
              </WriterInfoContainer>
            </ResumeInfo>
          </ResumeViewerHeader>

          <PdfViewer
            showAllPages={false}
            file={resumeDetail.resumeUrl}
            totalPages={totalPages}
            scale={scale}
            pageNum={currentPageNum}
            onLoadSuccess={setTotalPages}
            width="100%"
            height={isMobile ? '100vh' : '100%'}
          >
            <PdfViewer.PdfPagesInfo>
              current: {currentPageNum} / {totalPages}
            </PdfViewer.PdfPagesInfo>
            <PdfController
              onGoToPrevPage={prevPage}
              onGoToNextPage={nextPage}
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
            />
          </PdfViewer>
        </ResumeViewer>

        <Aside>
          <AsideHeader>
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
            <IconButton aria-label="가이드북 열기" onClick={openGuideBook}>
              <Icon iconName="info" color={theme.palette.blue} width={24} height={24} />
            </IconButton>
          </AsideHeader>

          {currentTab === 'feedback' && isValidResumeId && (
            <Suspense
              fallback={
                <DelayedComponent>
                  <SpinnerWrapper>
                    <Spinner size="5rem" />
                  </SpinnerWrapper>
                </DelayedComponent>
              }
            >
              <FeedbackSection
                resumeDetail={resumeDetail}
                resumeId={Number(resumeId)}
                currentPageNum={currentPageNum}
                filter={filter}
                onChangeFilter={setFilter}
              />
            </Suspense>
          )}

          {currentTab === 'question' && isValidResumeId && (
            <Suspense
              fallback={
                <DelayedComponent>
                  <SpinnerWrapper>
                    <Spinner size="5rem" />
                  </SpinnerWrapper>
                </DelayedComponent>
              }
            >
              <QuestionSection
                resumeDetail={resumeDetail}
                resumeId={Number(resumeId)}
                currentPageNum={currentPageNum}
                filter={filter}
                onChangeFilter={setFilter}
              />
            </Suspense>
          )}

          {currentTab === 'comment' && isValidResumeId && (
            <Suspense
              fallback={
                <DelayedComponent>
                  <SpinnerWrapper>
                    <Spinner size="5rem" />
                  </SpinnerWrapper>
                </DelayedComponent>
              }
            >
              <CommentSection resumeId={Number(resumeId)} />
            </Suspense>
          )}
        </Aside>
      </ResumeContentWrapper>
    </Main>
  );
};

export default ResumeDetail;

const PdfLink = ({ resumeUrl, title }: { resumeUrl: string; title: string }) => {
  return (
    <a
      href={`${process.env.BASE_PDF_URL}/${resumeUrl}`}
      download={title}
      target="_blank"
      rel="noreferrer"
      style={{ display: 'flex' }}
    >
      <Icon iconName="download" color={theme.color.accent.bd.weak} />
    </a>
  );
};

const PdfController = ({
  onGoToPrevPage,
  onGoToNextPage,
  onZoomIn,
  onZoomOut,
}: {
  onGoToPrevPage: () => void;
  onGoToNextPage: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}) => {
  const PDF_BUTTON_ICON_SIZE = 24;

  return (
    <ButtonGroup height="2rem">
      <ButtonGroup.Button aria-label="이전 페이지로 이동" onClick={onGoToPrevPage}>
        <Icon iconName="leftArrow" width={PDF_BUTTON_ICON_SIZE} height={PDF_BUTTON_ICON_SIZE} />
      </ButtonGroup.Button>
      <ButtonGroup.Button aria-label="pdf 확대" onClick={onZoomIn}>
        <Icon iconName="plus" width={PDF_BUTTON_ICON_SIZE} height={PDF_BUTTON_ICON_SIZE} />
      </ButtonGroup.Button>
      <ButtonGroup.Button aria-label="pdf 축소" onClick={onZoomOut}>
        <Icon iconName="minus" width={PDF_BUTTON_ICON_SIZE} height={PDF_BUTTON_ICON_SIZE} />
      </ButtonGroup.Button>
      <ButtonGroup.Button aria-label="다음 페이지로 이동" onClick={onGoToNextPage}>
        <Icon iconName="rightArrow" width={PDF_BUTTON_ICON_SIZE} height={PDF_BUTTON_ICON_SIZE} />
      </ButtonGroup.Button>
    </ButtonGroup>
  );
};

const FeedbackSection = ({
  resumeDetail,
  resumeId,
  currentPageNum,
  onChangeFilter,
  filter,
}: {
  resumeDetail: GetResumeDetail;
  resumeId: number;
  currentPageNum: number;
  onChangeFilter: (filter: { checked: boolean; bookmarked: boolean }) => void;
  filter: { checked: boolean; bookmarked: boolean };
}) => {
  const { jwt } = useUserContext();
  const {
    data: feedbackList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFeedbackList({
    resumeId,
    resumePage: currentPageNum,
    checked: filter.checked,
    jwt,
  });
  const { setTarget } = useIntersectionObserver({
    onIntersect: () => {
      fetchNextPage();
    },
    options: {
      threshold: 0.5,
    },
  });

  const feedbackListRef = useRef<HTMLUListElement>(null);

  const scrollToTop = () => {
    feedbackListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <CommentListWrapper>
        <CommentList ref={feedbackListRef}>
          <CommentHeader>
            <span>필터</span>
            <Switch
              label="check"
              checked={filter.checked}
              onChange={() => {
                onChangeFilter({ ...filter, checked: !filter.checked });
              }}
            />
          </CommentHeader>

          {feedbackList && feedbackList.length > 0 ? (
            feedbackList.map((feedback) => {
              return (
                <li key={feedback.id}>
                  <Feedback
                    resumeId={resumeId}
                    resumePage={currentPageNum}
                    resumeWriterId={resumeDetail.writerId}
                    {...feedback}
                  />
                </li>
              );
            })
          ) : (
            <EmptyListNotification>
              <span>아직 작성된 피드백이 없어요.</span>
              <span>피드백을 남겨보세요!</span>
            </EmptyListNotification>
          )}
          {hasNextPage && !isFetchingNextPage && <div ref={setTarget}></div>}
        </CommentList>
      </CommentListWrapper>
      <FeedbackAddForm resumeId={resumeId} resumePage={currentPageNum} onSubmitSuccess={scrollToTop} />
    </>
  );
};

const QuestionSection = ({
  resumeDetail,
  resumeId,
  currentPageNum,
  filter,
  onChangeFilter,
}: {
  resumeDetail: GetResumeDetail;
  resumeId: number;
  currentPageNum: number;
  onChangeFilter: (filter: { checked: boolean; bookmarked: boolean }) => void;
  filter: { checked: boolean; bookmarked: boolean };
}) => {
  const { jwt } = useUserContext();
  const {
    data: questionList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useQuestionList({
    resumeId,
    resumePage: currentPageNum,
    checked: filter.checked,
    bookmarked: filter.bookmarked,
    jwt,
  });
  const { setTarget } = useIntersectionObserver({
    onIntersect: () => {
      fetchNextPage();
    },
    options: {
      threshold: 0.5,
    },
  });

  const questionListRef = useRef<HTMLUListElement>(null);

  const scrollToTop = () => {
    questionListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <CommentListWrapper>
        <CommentList ref={questionListRef}>
          <CommentHeader>
            <span>필터</span>
            <SwitchContainer>
              <Switch
                label="check"
                checked={filter.checked}
                onChange={() => {
                  onChangeFilter({ ...filter, checked: !filter.checked });
                }}
              />
              <Switch
                label="bookmark"
                checked={filter.bookmarked}
                onChange={() => {
                  onChangeFilter({ ...filter, bookmarked: !filter.bookmarked });
                }}
              />
            </SwitchContainer>
          </CommentHeader>

          {questionList && questionList.length > 0 ? (
            questionList.map((question) => {
              return (
                <li key={question.id}>
                  <Question
                    resumeId={Number(resumeId)}
                    resumePage={currentPageNum}
                    resumeWriterId={resumeDetail.writerId}
                    {...question}
                  />
                </li>
              );
            })
          ) : (
            <EmptyListNotification>
              <span>아직 작성된 예상질문이 없어요.</span>
              <span>예상질문을 남겨보세요!</span>
            </EmptyListNotification>
          )}
          {hasNextPage && !isFetchingNextPage && <div ref={setTarget}></div>}
        </CommentList>
      </CommentListWrapper>
      <QuestionAddForm resumeId={resumeId} resumePage={currentPageNum} onSubmitSuccess={scrollToTop} />
    </>
  );
};

const CommentSection = ({ resumeId }: { resumeId: number }) => {
  const { jwt } = useUserContext();
  const {
    data: commentList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCommentList({
    resumeId,
    jwt,
  });
  const { setTarget } = useIntersectionObserver({
    onIntersect: () => {
      fetchNextPage();
    },
    options: {
      threshold: 0.5,
    },
  });

  const commentListRef = useRef<HTMLUListElement>(null);

  const scrollToTop = () => {
    commentListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <CommentListWrapper>
        <CommentList ref={commentListRef}>
          {commentList && commentList.length > 0 ? (
            commentList.map((comment) => {
              return (
                <li key={comment.id}>
                  <Comment resumeId={resumeId} {...comment} />
                </li>
              );
            })
          ) : (
            <EmptyListNotification>
              <span>아직 댓글이 없어요.</span>
              <span>댓글을 남겨보세요!</span>
            </EmptyListNotification>
          )}
          {hasNextPage && !isFetchingNextPage && <div ref={setTarget}></div>}
        </CommentList>
      </CommentListWrapper>
      <CommentAddForm resumeId={resumeId} onSubmitSuccess={scrollToTop} />
    </>
  );
};
