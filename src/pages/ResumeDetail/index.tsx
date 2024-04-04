import React, { MouseEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Icon, Switch, theme, useModal } from 'review-me-design-system';
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
import usePdf from '@hooks/usePdf';
import { useUserContext } from '@contexts/userContext';
import { useCommentList } from '@apis/commentApi';
import { useFeedbackList } from '@apis/feedbackApi';
import { useQuestionList } from '@apis/questionApi';
import { useResumeDetail } from '@apis/resumeApi';
import { breakPoints } from '@styles/common';
import { IconButton } from '@styles/iconButton';
import { manageBodyScroll } from '@utils';
import {
  Career,
  CommentList,
  ResumeDetailAside,
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
  ResumeDetailAsideHeader,
} from './style';

type ActiveTab = 'feedback' | 'question' | 'comment';

const ResumeDetail = () => {
  const { jwt, isLoggedIn, user } = useUserContext();
  const { resumeId } = useParams();

  const { matches: isMobile } = useMediaQuery({ mediaQueryString: breakPoints.mobile });

  const { data: resumeDetail } = useResumeDetail({ resumeId: Number(resumeId), jwt });

  const PDF_BUTTON_ICON_SIZE = 24;

  const { totalPages, currentPageNum, scale, setTotalPages, zoomIn, zoomOut, prevPage, nextPage } = usePdf(
    {},
  );

  const [currentTab, setCurrentTab] = useState<ActiveTab>('feedback');

  const [filter, setFilter] = useState<{ checked: boolean; bookmarked: boolean }>({
    checked: false,
    bookmarked: false,
  });

  const enabledAboutFeedbackList = isLoggedIn
    ? currentTab === 'feedback' && !!jwt
    : currentTab === 'feedback';

  const { data: feedbackList, fetchNextPage: fetchNextPageAboutFeedback } = useFeedbackList({
    resumeId: Number(resumeId),
    resumePage: currentPageNum,
    checked: filter.checked,
    enabled: enabledAboutFeedbackList,
    jwt,
  });
  const { data: questionList, fetchNextPage: fetchNextPageAboutQuestion } = useQuestionList({
    resumeId: Number(resumeId),
    resumePage: currentPageNum,
    checked: filter.checked,
    bookmarked: filter.bookmarked,
    enabled: currentTab === 'question',
    jwt,
  });
  const { data: commentList, fetchNextPage: fetchNextPageAboutComment } = useCommentList({
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

  const initIsOpenGuideBook = localStorage.getItem('skip') !== 'true';
  const {
    isOpen: isOpenGuideBook,
    open: openGuideBook,
    close: closeGuideBook,
  } = useModal(initIsOpenGuideBook);

  const handleOpenGuideBook = () => {
    openGuideBook();
    manageBodyScroll(false);
    localStorage.removeItem('skip');
  };

  const handleCloseGuideBook = () => {
    closeGuideBook();
    manageBodyScroll(true);
    localStorage.setItem('skip', 'true');
  };

  useEffect(() => {
    if (isOpenGuideBook) {
      manageBodyScroll(false);
    }
  }, [isOpenGuideBook]);

  return (
    <>
      <Main $isMobile={isMobile}>
        <ResumeContentWrapper $isMobile={isMobile}>
          <ResumeViewer $isMobile={isMobile}>
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

          <ResumeDetailAside $isMobile={isMobile}>
            <ResumeDetailAsideHeader>
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
              <IconButton onClick={handleOpenGuideBook}>
                <Icon iconName="info" color={theme.palette.blue} width={24} height={24} />
              </IconButton>
            </ResumeDetailAsideHeader>

            <CommentList $isMobile={isMobile}>
              {currentTab !== 'comment' && (
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
                    {currentTab === 'question' && resumeDetail?.writerId === user?.id && (
                      <Switch
                        label="bookmark"
                        checked={filter.bookmarked}
                        onChange={() => {
                          setFilter((prev) => ({ ...prev, bookmarked: !prev.bookmarked }));
                        }}
                      />
                    )}
                  </SwitchContainer>
                </CommentHeader>
              )}
              {currentTab === 'feedback' &&
                resumeDetail &&
                feedbackList?.map((feedback) => {
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
                })}
              {currentTab === 'question' &&
                resumeDetail &&
                questionList?.map((question) => {
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
                })}
              {currentTab === 'comment' &&
                commentList?.map((comment) => {
                  return (
                    <li key={comment.id}>
                      <Comment resumeId={Number(resumeId)} {...comment} />
                    </li>
                  );
                })}
              <div ref={setTarget}></div>
            </CommentList>

            {currentTab === 'feedback' && resumeId && (
              <FeedbackAddForm resumeId={Number(resumeId)} resumePage={currentPageNum} />
            )}
            {currentTab === 'question' && resumeId && (
              <QuestionAddForm resumeId={Number(resumeId)} resumePage={currentPageNum} />
            )}
            {currentTab === 'comment' && resumeId && <CommentAddForm resumeId={Number(resumeId)} />}
          </ResumeDetailAside>
        </ResumeContentWrapper>
      </Main>
      <GuideBook isOpen={isOpenGuideBook} onClose={handleCloseGuideBook} />
    </>
  );
};

export default ResumeDetail;
