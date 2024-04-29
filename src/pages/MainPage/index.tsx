import React from 'react';
import { useNavigate } from 'react-router-dom';
import commentImg from '@assets/comment.png';
import feedbackImg from '@assets/feedback.png';
import mainJpg from '@assets/main.jpg';
import mainSmallWebp from '@assets/main_1040w.webp';
import mainLargeWebp from '@assets/main_1680w.webp';
import questionImg from '@assets/question.png';
import { Button } from 'review-me-design-system';
import { ROUTE_PATH } from '@constants';
import { Description, DescriptionText, Guide, Img, Main, MainPageLayout, ReviewMe, Title } from './style';

interface Description {
  id: string;
  title: string;
  description: string;
  imgSrc: string;
}

const description: Description[] = [
  {
    id: 'feedback',
    title: '피드백',
    description: '사람들의 피드백을 통해 이력서를 다듬어보세요.',
    imgSrc: feedbackImg,
  },
  {
    id: 'question',
    title: '예상질문',
    description: '면접에서 나올 수 있는 다양한 예상 질문들을 공유하고, 이에 대한 답변을 준비해보세요.',
    imgSrc: questionImg,
  },
  {
    id: 'comment',
    title: '댓글',
    description: '이력서에 대한 다양한 의견을 공유할 수 있어요.',
    imgSrc: commentImg,
  },
];

const MainPage = () => {
  const navigate = useNavigate();
  const mainImgBreakPoint = '(max-width: 768px)';

  return (
    <MainPageLayout>
      <Main>
        <Title>
          <ReviewMe>review me</ReviewMe>에서
          <br />
          이력서로 성장의 길을 함께 걸어요.
        </Title>
        <picture>
          <source
            type="image/webp"
            srcSet={`${mainSmallWebp} 1040w, ${mainLargeWebp} 1680w`}
            sizes={`${mainImgBreakPoint} 90vw, 700px`}
          />
          <img src={mainJpg} alt="main" />
        </picture>
      </Main>

      <Guide>
        <Title>review me에서</Title>
        <DescriptionText>사람들과 이력서에 대한 피드백, 예상질문, 댓글을 공유할 수 있습니다.</DescriptionText>
      </Guide>

      {description.map(({ id, title, description, imgSrc }, index) => (
        <Description key={id} $index={index}>
          {index % 2 === 0 ? (
            <>
              <div>
                <Title>{title}</Title>
                <DescriptionText>{description}</DescriptionText>
              </div>
              <Img src={imgSrc} alt={id} />
            </>
          ) : (
            <>
              <Img src={imgSrc} alt={id} />
              <div>
                <Title>{title}</Title>
                <DescriptionText>{description}</DescriptionText>
              </div>
            </>
          )}
        </Description>
      ))}

      <Guide>
        <Title>지금 바로 시작해보세요!</Title>
        <Button variant="default" size="l" onClick={() => navigate(ROUTE_PATH.RESUME)}>
          이력서 보러가기
        </Button>
      </Guide>
    </MainPageLayout>
  );
};

export default MainPage;
