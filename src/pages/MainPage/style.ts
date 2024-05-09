import { theme } from 'review-me-design-system';
import styled, { css } from 'styled-components';
import { breakPoints } from '@styles/common';

const MainPageLayout = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 52rem;

  @media ${breakPoints.desktop} {
    width: 60%;
    margin: 0 auto;
  }
  @media ${breakPoints.tablet} {
    width: 80%;
    margin: 0 auto;
  }
  @media ${breakPoints.mobile} {
    width: 90%;
    margin: 0 auto;
  }
`;

const Main = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 4rem;
`;

const Title = styled.h2`
  ${theme.font.title.strong}
  color: ${theme.color.neutral.text.strong};
`;

const ReviewMe = styled.span`
  color: ${theme.color.accent.text.weak};
`;

const imageStyles = css`
  border-radius: 1.25rem;
  box-shadow: 0.875rem 1.75rem 2.5rem rgba(0, 0, 0, 0.05);
`;

const MainImg = styled.img`
  ${imageStyles}
  width: 100%;
  max-width: 700px;
`;

const Img = styled.img`
  ${imageStyles}
`;

const Guide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 5rem 0;
`;

const Description = styled.div<{ $index: number }>`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  margin-bottom: 7.5rem;

  transform: translate3d(0px, 50px, 0px);
  transition: all 0.5s ease-in-out;

  @media ${breakPoints.mobile} {
    margin-bottom: 4rem;
    flex-direction: ${({ $index }) => ($index % 2 === 0 ? 'column' : 'column-reverse')};
  }
`;

const DescriptionText = styled.span`
  ${theme.font.body.medium}
  color: ${theme.palette.gray500};
`;

export { MainPageLayout, Main, Title, ReviewMe, MainImg, Img, Guide, Description, DescriptionText };
