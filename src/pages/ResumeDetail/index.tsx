import React, { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Icon, Input, Label, Textarea } from 'review-me-design-system';
import ButtonGroup from '@components/ButtonGroup';
import Comment from '@components/Comment';
import PdfViewer from '@components/PdfViewer';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import usePdf from '@hooks/usePdf';
import { useUserContext } from '@contexts/userContext';
import { useCommentList, usePostComment } from '@apis/commentApi';
import { useFeedbackList, usePostFeedback } from '@apis/feedbackApi';
import { usePostQuestion, useQuestionLabelList, useQuestionList } from '@apis/questionApi';
import { useResumeDetail } from '@apis/resumeApi';
import { useLabelList } from '@apis/utilApi';
import {
  Career,
  CommentList,
  FeedbackAndQuestion,
  Form,
  FormContent,
  LabelList,
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
  KeywordLabel,
} from './style';

type ActiveTab = 'feedback' | 'question' | 'comment';

const ResumeDetail = () => {
  const queryClient = useQueryClient();
  const { jwt, isLoggedIn } = useUserContext();
  const { resumeId } = useParams();

  const { data: resumeDetail } = useResumeDetail(Number(resumeId));

  const PDF_BUTTON_ICON_SIZE = 24;

  const { totalPages, currentPageNum, scale, setTotalPages, zoomIn, zoomOut, prevPage, nextPage } = usePdf(
    {},
  );

  const [currentTab, setCurrentTab] = useState<ActiveTab>('feedback');

  const [labelId, setLabelId] = useState<number | undefined>();
  const [labelContent, setLabelContent] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const { data: labelList } = useLabelList();

  const enabledAboutFeedbackList = isLoggedIn
    ? currentTab === 'feedback' && !!jwt
    : currentTab === 'feedback';

  const {
    data: feedbackListData,
    refetch: refetchFeedbackList,
    fetchNextPage: fetchNextPageAboutFeedback,
  } = useFeedbackList({
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

  useEffect(() => {
    if (jwt && currentTab === 'feedback') {
      refetchFeedbackList();
    }
  }, [jwt, currentTab]);

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

  const { data: questionLabelList } = useQuestionLabelList({
    resumeId: Number(resumeId),
    enabled: currentTab === 'question',
  });

  const { mutate: addFeedback } = usePostFeedback();
  const { mutate: addQuestion } = usePostQuestion();
  const { mutate: addComment } = usePostComment();

  const textareaPlaceholder = {
    feedback: '피드백',
    question: '예상질문',
    comment: '댓글',
  };

  const resetForm = () => {
    setLabelContent('');
    setLabelId(undefined);
    setComment('');
  };

  const handleTabClick = (e: MouseEvent<HTMLButtonElement>, tab: ActiveTab) => {
    setCurrentTab(tab);
    resetForm();
  };

  const isAuthenticated = jwt && isLoggedIn;

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!resumeId || !comment || !isAuthenticated) return;

    if (currentTab === 'feedback') {
      addFeedback(
        {
          resumeId: Number(resumeId),
          content: comment,
          labelId,
          resumePage: currentPageNum,
          jwt,
        },
        {
          onSuccess: () => {
            return queryClient.invalidateQueries({
              queryKey: ['feedbackList', Number(resumeId), currentPageNum],
            });
          },
        },
      );
    } else if (currentTab === 'question') {
      addQuestion(
        {
          resumeId: Number(resumeId),
          content: comment,
          labelContent: labelContent.trim(),
          resumePage: currentPageNum,
          jwt,
        },
        {
          onSuccess: () => {
            return Promise.all([
              queryClient.invalidateQueries({
                queryKey: ['questionList', Number(resumeId), currentPageNum],
              }),
              queryClient.invalidateQueries({
                queryKey: ['questionList', Number(resumeId), 'labelList'],
              }),
            ]);
          },
        },
      );
    } else if (currentTab === 'comment') {
      addComment(
        {
          resumeId: Number(resumeId),
          content: comment,
          jwt,
        },
        {
          onSuccess: () => {
            return queryClient.invalidateQueries({
              queryKey: ['commentList', Number(resumeId)],
            });
          },
        },
      );
    }

    resetForm();
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

          <Form onSubmit={handleFormSubmit}>
            {currentTab === 'feedback' && (
              <LabelList>
                {labelList?.map(({ id, label }) => {
                  return (
                    <Label
                      key={id}
                      isActive={labelId === id}
                      py="4px"
                      px="12px"
                      onClick={() => setLabelId(id)}
                    >
                      {label}
                    </Label>
                  );
                })}
              </LabelList>
            )}
            {currentTab === 'question' && (
              <>
                <KeywordLabel>{labelContent}</KeywordLabel>
                <Input
                  placeholder="예상질문 키워드"
                  value={labelContent}
                  onChange={(e) => setLabelContent(e.target.value)}
                />
              </>
            )}
            <FormContent>
              <Textarea
                placeholder={textareaPlaceholder[currentTab] || ''}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button variant="default" size="s">
                작성
              </Button>
            </FormContent>
          </Form>
        </FeedbackAndQuestion>
      </ResumeContentWrapper>
    </Main>
  );
};

export default ResumeDetail;
