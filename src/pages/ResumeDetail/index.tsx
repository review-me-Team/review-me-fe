import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Icon, Switch, theme } from 'review-me-design-system';
import ButtonGroup from '@components/ButtonGroup';
import Comment from '@components/Comment';
import CommentAddForm from '@components/CommentForm/CommentAddForm';
import Feedback from '@components/Feedback';
import FeedbackAddForm from '@components/FeedbackForm/FeedbackAddForm';
import GuideBook from '@components/Modal/GuideBook';
import PdfViewer from '@components/PdfViewer';
import Question from '@components/Question';
import QuestionAddForm from '@components/QuestionForm/QuestionAddForm';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useMediaQuery from '@hooks/useMediaQuery';
import useModals from '@hooks/useModals';
import usePdf from '@hooks/usePdf';
import { useUserContext } from '@contexts/userContext';
import { useCommentList } from '@apis/commentApi';
import { useFeedbackList } from '@apis/feedbackApi';
import { useQuestionList } from '@apis/questionApi';
import { useResumeDetail } from '@apis/resumeApi';
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
} from './style';

type ActiveTab = 'feedback' | 'question' | 'comment';

const ResumeDetail = () => {
  const { jwt, user } = useUserContext();
  const { resumeId } = useParams();
  const isValidResumeId = isNumeric(resumeId);

  const { matches: isMobile } = useMediaQuery({ mediaQueryString: breakPoints.mobile });

  const { data: resumeDetail } = useResumeDetail({ resumeId: Number(resumeId), jwt });

  const PDF_BUTTON_ICON_SIZE = 24;

  const { totalPages, currentPageNum, scale, setTotalPages, zoomIn, zoomOut, prevPage, nextPage } = usePdf({
    initScale: isMobile ? 0.6 : 1,
  });

  const [currentTab, setCurrentTab] = useState<ActiveTab>('feedback');

  const [filter, setFilter] = useState<{ checked: boolean; bookmarked: boolean }>({
    checked: false,
    bookmarked: false,
  });

  const {
    data: feedbackList,
    fetchNextPage: fetchNextPageAboutFeedback,
    hasNextPage: hasNextPageAboutFeedback,
    isFetchingNextPage: isFetchingNextPageAboutFeedback,
  } = useFeedbackList({
    resumeId: Number(resumeId),
    resumePage: currentPageNum,
    checked: filter.checked,
    enabled: currentTab === 'feedback',
    jwt,
  });
  const {
    data: questionList,
    fetchNextPage: fetchNextPageAboutQuestion,
    hasNextPage: hasNextPageAboutQuestion,
    isFetchingNextPage: isFetchingNextPageAboutQuestion,
  } = useQuestionList({
    resumeId: Number(resumeId),
    resumePage: currentPageNum,
    checked: filter.checked,
    bookmarked: filter.bookmarked,
    enabled: currentTab === 'question',
    jwt,
  });
  const {
    data: commentList,
    fetchNextPage: fetchNextPageAboutComment,
    hasNextPage: hasNextPageAboutComment,
    isFetchingNextPage: isFetchingNextPageAboutComment,
  } = useCommentList({
    resumeId: Number(resumeId),
    enabled: currentTab === 'comment',
    jwt,
  });

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
    setFilter({ checked: false, bookmarked: false });
  };

  const { open } = useModals();

  const commentListRef = useRef<HTMLUListElement>(null);

  const scrollToTopOfCommentList = () => {
    commentListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isMyResume = resumeDetail.writerId === user?.id;

  const SKIP_GUIDE_BOOK_KEY = 'skipGuideBook';

  useEffect(() => {
    if (!localStorage.getItem(SKIP_GUIDE_BOOK_KEY)) {
      open(
        ({ isOpen, onClose }) => (
          <GuideBook
            isOpen={isOpen}
            onClose={() => {
              localStorage.setItem(SKIP_GUIDE_BOOK_KEY, 'true');
              onClose();
            }}
          />
        ),
        {
          modalId: 'guideBook',
        },
      );
    }
  }, []);

  return (
    <Main>
      <ResumeContentWrapper>
        <ResumeViewer>
          <ResumeViewerHeader>
            <ResumeInfo>
              <TitleContainer>
                {isMyResume && (
                  <a
                    href={`${process.env.BASE_PDF_URL}/${resumeDetail.resumeUrl}`}
                    download={resumeDetail.title}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'flex' }}
                  >
                    <Icon iconName="download" color={theme.color.accent.bd.weak} />
                  </a>
                )}
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
            <ButtonGroup height="2rem">
              <ButtonGroup.Button aria-label="이전 페이지로 이동" onClick={prevPage}>
                <Icon iconName="leftArrow" width={PDF_BUTTON_ICON_SIZE} height={PDF_BUTTON_ICON_SIZE} />
              </ButtonGroup.Button>
              <ButtonGroup.Button aria-label="pdf 확대" onClick={zoomIn}>
                <Icon iconName="plus" width={PDF_BUTTON_ICON_SIZE} height={PDF_BUTTON_ICON_SIZE} />
              </ButtonGroup.Button>
              <ButtonGroup.Button aria-label="pdf 축소" onClick={zoomOut}>
                <Icon iconName="minus" width={PDF_BUTTON_ICON_SIZE} height={PDF_BUTTON_ICON_SIZE} />
              </ButtonGroup.Button>
              <ButtonGroup.Button aria-label="다음 페이지로 이동" onClick={nextPage}>
                <Icon iconName="rightArrow" width={PDF_BUTTON_ICON_SIZE} height={PDF_BUTTON_ICON_SIZE} />
              </ButtonGroup.Button>
            </ButtonGroup>
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
            <IconButton
              aria-label="가이드북 열기"
              onClick={() => {
                open(({ isOpen, onClose }) => (
                  <GuideBook
                    isOpen={isOpen}
                    onClose={() => {
                      localStorage.setItem(SKIP_GUIDE_BOOK_KEY, 'true');
                      onClose();
                    }}
                  />
                ));
              }}
            >
              <Icon iconName="info" color={theme.palette.blue} width={24} height={24} />
            </IconButton>
          </AsideHeader>

          {currentTab === 'feedback' && isValidResumeId && (
            <>
              <CommentListWrapper>
                <CommentList ref={commentListRef}>
                  <CommentHeader>
                    <span>필터</span>
                    <Switch
                      label="check"
                      checked={filter.checked}
                      onChange={() => {
                        setFilter((prev) => ({ ...prev, checked: !prev.checked }));
                      }}
                    />
                  </CommentHeader>

                  {feedbackList && feedbackList.length > 0 ? (
                    feedbackList.map((feedback) => {
                      return (
                        <li key={feedback.id}>
                          <Feedback
                            resumeId={Number(resumeId)}
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
                  {hasNextPageAboutFeedback && !isFetchingNextPageAboutFeedback && (
                    <div ref={setTarget}></div>
                  )}
                </CommentList>
              </CommentListWrapper>
              <FeedbackAddForm
                resumeId={Number(resumeId)}
                resumePage={currentPageNum}
                onSubmitSuccess={scrollToTopOfCommentList}
              />
            </>
          )}

          {currentTab === 'question' && isValidResumeId && (
            <>
              <CommentListWrapper>
                <CommentList ref={commentListRef}>
                  <CommentHeader>
                    <span>필터</span>
                    <SwitchContainer>
                      <Switch
                        label="check"
                        checked={filter.checked}
                        onChange={() => {
                          setFilter((prev) => ({ ...prev, checked: !prev.checked }));
                        }}
                      />
                      <Switch
                        label="bookmark"
                        checked={filter.bookmarked}
                        onChange={() => {
                          setFilter((prev) => ({ ...prev, bookmarked: !prev.bookmarked }));
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
                  {hasNextPageAboutQuestion && !isFetchingNextPageAboutQuestion && (
                    <div ref={setTarget}></div>
                  )}
                </CommentList>
              </CommentListWrapper>
              <QuestionAddForm
                resumeId={Number(resumeId)}
                resumePage={currentPageNum}
                onSubmitSuccess={scrollToTopOfCommentList}
              />
            </>
          )}

          {currentTab === 'comment' && isValidResumeId && (
            <>
              <CommentListWrapper>
                <CommentList ref={commentListRef}>
                  {commentList && commentList.length > 0 ? (
                    commentList.map((comment) => {
                      return (
                        <li key={comment.id}>
                          <Comment resumeId={Number(resumeId)} {...comment} />
                        </li>
                      );
                    })
                  ) : (
                    <EmptyListNotification>
                      <span>아직 댓글이 없어요.</span>
                      <span>댓글을 남겨보세요!</span>
                    </EmptyListNotification>
                  )}
                  {hasNextPageAboutComment && !isFetchingNextPageAboutComment && <div ref={setTarget}></div>}
                </CommentList>
              </CommentListWrapper>
              <CommentAddForm resumeId={Number(resumeId)} onSubmitSuccess={scrollToTopOfCommentList} />
            </>
          )}
        </Aside>
      </ResumeContentWrapper>
    </Main>
  );
};

export default ResumeDetail;
