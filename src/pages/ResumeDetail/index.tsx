import React, { useState } from 'react';
import { Button, Icon, Label, Textarea } from 'review-me-design-system';
import ButtonGroup from '@components/ButtonGroup';
import Comment from '@components/Comment';
import PdfViewer from '@components/PdfViewer';
import {
  Career,
  CommentList,
  FeedbackAndQuestion,
  Form,
  FeedbackFormContent,
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
} from './style';

type ActiveTab = 'feedback' | 'question' | 'comment';

const ResumeDetail = () => {
  // * 초기값 임시로 설정
  const INIT_CURRENT_PAGE_NUM = 1;
  const INIT_SCALE = 1.2;
  const MAX_SCALE = 2;
  const MIN_SCALE = 0.6;
  const SCALE_STEP = 0.2;
  const [file, setFile] = useState<string | undefined>(
    `${process.env.BASE_PDF_URL}/ad6c62c6이력서_샘플.pdf`,
  );
  const [numPages, setNumPages] = useState<number>();
  const [currentPageNum, setCurrentPageNum] = useState<number>(INIT_CURRENT_PAGE_NUM);
  const [scale, setScale] = useState<number>(INIT_SCALE);
  const [currentTab, setCurrentTab] = useState<ActiveTab>('feedback');

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
            <Tab $isActive={currentTab === 'feedback'} onClick={() => setCurrentTab('feedback')}>
              피드백
            </Tab>
            <Tab $isActive={currentTab === 'question'} onClick={() => setCurrentTab('question')}>
              예상질문
            </Tab>
            <Tab $isActive={currentTab === 'comment'} onClick={() => setCurrentTab('comment')}>
              댓글
            </Tab>
          </TabList>

          <CommentList>
            <li>
              <Comment
                content="뭔가 이력서에 문제 해결과 관련된 내용이 부족한 것같아요."
                commenterId={2}
                commenterName="acceptor-gyu"
                commenterProfileUrl="https://avatars.githubusercontent.com/u/71162390?v=4"
                labelContent="자기소개"
                createdAt="2023-12-22 15:46:05"
                countOfReplies={0}
                checked={false}
                emojis={[
                  {
                    id: 2,
                    count: 2,
                  },
                  {
                    id: 3,
                    count: 1,
                  },
                ]}
                myEmojiId={2}
              />
              <ReplyList>
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
              </ReplyList>
            </li>

            <li>
              <Comment
                content="뭔가 이력서에 문제 해결과 관련된 내용이 부족한 것같아요."
                commenterId={2}
                commenterName="acceptor-gyu"
                commenterProfileUrl="https://avatars.githubusercontent.com/u/71162390?v=4"
                labelContent="자기소개"
                createdAt="2023-12-22 15:46:05"
                countOfReplies={0}
                checked={false}
                emojis={[
                  {
                    id: 2,
                    count: 2,
                  },
                  {
                    id: 3,
                    count: 1,
                  },
                ]}
                myEmojiId={2}
              />
            </li>
          </CommentList>

          <Form>
            <LabelList>
              {/* todo: label api에서 받아온 데이터로 바꾸기 */}
              <Label isActive={false} py="0.25rem" px="0.75rem">
                프로젝트
              </Label>
              <Label isActive={false} py="0.25rem" px="0.75rem">
                자기소개
              </Label>
              <Label isActive={false} py="0.25rem" px="0.75rem">
                협업
              </Label>
              <Label isActive={false} py="0.25rem" px="0.75rem">
                기타
              </Label>
            </LabelList>
            <FeedbackFormContent>
              <Textarea placeholder="피드백" />
              <Button variant="default" size="s">
                작성
              </Button>
            </FeedbackFormContent>
          </Form>
        </FeedbackAndQuestion>
      </ResumeContentWrapper>
    </Main>
  );
};

export default ResumeDetail;
