import React, { MouseEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Icon, Input, Label, Textarea } from 'review-me-design-system';
import ButtonGroup from '@components/ButtonGroup';
import Comment from '@components/Comment';
import PdfViewer from '@components/PdfViewer';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useCommentList } from '@apis/commentApi';
import { useFeedbackList } from '@apis/feedbackApi';
import { useQuestionList } from '@apis/questionApi';
import { useLabelList } from '@apis/utilApi';
import { PDF_VIEWER_SCALE } from '@constants';
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
  ReplyList,
  ReplyForm,
  ResumeViewer,
  PdfViewerContainer,
  PdfViewerInfo,
  PdfPagesInfo,
  KeywordLabel,
} from './style';

type ActiveTab = 'feedback' | 'question' | 'comment';

const ResumeDetail = () => {
  const INIT_CURRENT_PAGE_NUM = 1;
  const { INIT_SCALE, MAX_SCALE, MIN_SCALE, SCALE_STEP } = PDF_VIEWER_SCALE;

  const [file, setFile] = useState<string | undefined>(
    `${process.env.BASE_PDF_URL}/ad6c62c6이력서_샘플.pdf`,
  );

  const [numPages, setNumPages] = useState<number>();
  const [currentPageNum, setCurrentPageNum] = useState<number>(INIT_CURRENT_PAGE_NUM);
  const [scale, setScale] = useState<number>(INIT_SCALE);

  const [currentTab, setCurrentTab] = useState<ActiveTab>('feedback');

  const [labelContent, setLabelContent] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const { data: labelList } = useLabelList();

  const resumeId = useParams();
  const { data: feedbackListData, fetchNextPage: fetchNextPageAboutFeedback } = useFeedbackList({
    resumeId: Number(resumeId),
  });
  const { data: questionListData, fetchNextPage: fetchNextPageAboutQuestion } = useQuestionList({
    resumeId: Number(resumeId),
  });
  const { data: commentListData, fetchNextPage: fetchNextPageAboutComment } = useCommentList({
    resumeId: Number(resumeId),
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

  const textareaPlaceholder = {
    feedback: '피드백',
    question: '예상질문',
    comment: '댓글',
  };

  const handleTabClick = (e: MouseEvent<HTMLButtonElement>, tab: ActiveTab) => {
    setCurrentTab(tab);
    setLabelContent('');
    setComment('');
  };

  return (
    <Main>
      <ResumeContentWrapper>
        <ResumeViewer>
          <ResumeViewerHeader>
            <ResumeInfo>
              <Title>네이버 신입 프론트 공채 준비</Title>

              <WriterInfoContainer>
                <WriterImg />
                <WriterInfo>
                  <span>aken-you</span>
                  <Career>Frontend | 신입</Career>
                </WriterInfo>
              </WriterInfoContainer>
            </ResumeInfo>
          </ResumeViewerHeader>

          <PdfViewerContainer>
            <PdfViewerInfo>
              <PdfPagesInfo>
                current: {currentPageNum} / {numPages}
              </PdfPagesInfo>
              <ButtonGroup height="2rem">
                <ButtonGroup.Button
                  onClick={() => {
                    if (currentPageNum > 1) setCurrentPageNum(currentPageNum - 1);
                  }}
                >
                  <Icon iconName="leftArrow" width={24} height={24} />
                </ButtonGroup.Button>
                <ButtonGroup.Button
                  onClick={() => {
                    if (scale < MAX_SCALE) {
                      setScale((scale) => Math.round((scale + SCALE_STEP) * 10) / 10);
                    }
                  }}
                >
                  <Icon iconName="plus" width={24} height={24} />
                </ButtonGroup.Button>
                <ButtonGroup.Button
                  onClick={() => {
                    if (scale > MIN_SCALE) {
                      setScale((scale) => Math.round((scale - SCALE_STEP) * 10) / 10);
                    }
                  }}
                >
                  <Icon iconName="minus" width={24} height={24} />
                </ButtonGroup.Button>
                <ButtonGroup.Button
                  onClick={() => {
                    if (!numPages) return;
                    if (currentPageNum < numPages) setCurrentPageNum(currentPageNum + 1);
                  }}
                >
                  <Icon iconName="rightArrow" width={24} height={24} />
                </ButtonGroup.Button>
              </ButtonGroup>
            </PdfViewerInfo>
            <PdfViewer
              showAllPages={false}
              file={file}
              numPages={numPages}
              scale={scale}
              pageNum={currentPageNum}
              onLoadSuccess={setNumPages}
              width="100%"
              height="100%"
            />
          </PdfViewerContainer>
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
                    <Comment {...feedback} />
                    {/* <ReplyList>
                      <Comment
                        content="프로젝트에서 react-query를 사용하셨는데 사용한 이유가 궁금합니다."
                        commenterId={1}
                        writerId={1}
                        commenterName="aken-you"
                        commenterProfileUrl="https://avatars.githubusercontent.com/u/96980857?v=4"
                        createdAt="2024-01-24 16:19:37"
                        emojis={[
                          {
                            id: 1,
                            count: 10,
                          },
                          {
                            id: 2,
                            count: 3,
                          },
                        ]}
                        myEmojiId={1}
                      />
                      <ReplyForm>
                        <Textarea placeholder="댓글" />
                        <Button variant="default" size="s">
                          작성
                        </Button>
                      </ReplyForm>
                    </ReplyList> */}
                  </li>
                );
              })}
            {currentTab === 'question' &&
              questionList?.map((question) => {
                return (
                  <li key={question.id}>
                    <Comment {...question} />
                  </li>
                );
              })}
            {currentTab === 'comment' &&
              commentList?.map((comment) => {
                return (
                  <li key={comment.id}>
                    <Comment {...comment} />
                  </li>
                );
              })}
            <div ref={setTarget}></div>
          </CommentList>

          <Form>
            {currentTab === 'feedback' && (
              <LabelList>
                {labelList?.map(({ id, label }) => {
                  return (
                    <Label key={id} isActive={false} py="0.25rem" px="0.75rem">
                      {label}
                    </Label>
                  );
                })}
              </LabelList>
            )}
            {currentTab === 'question' && (
              <>
                <KeywordLabel>{labelContent}</KeywordLabel>
                <Input placeholder="예상질문 키워드" onChange={(e) => setLabelContent(e.target.value)} />
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
