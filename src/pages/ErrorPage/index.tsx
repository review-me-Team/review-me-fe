import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'review-me-design-system';
import { ROUTE_PATH } from '@constants';
import { ButtonContainer, Description, ErrorPageLayout, ErrorSection, Title } from './style';

interface Props {
  title: string;
  description: string;
  resetError?: () => void;
}

const ErrorPage = ({ title, description, resetError }: Props) => {
  const navigate = useNavigate();

  return (
    <ErrorPageLayout>
      <ErrorSection>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <ButtonContainer>
          <Button
            variant="default"
            size="m"
            width="100%"
            onClick={() => {
              navigate(-1);
              if (resetError) resetError();
            }}
          >
            이전 페이지로 이동
          </Button>
          <Button
            variant="default"
            size="m"
            width="100%"
            onClick={() => {
              navigate(ROUTE_PATH.ROOT);
              if (resetError) resetError();
            }}
          >
            홈으로 이동
          </Button>
        </ButtonContainer>
      </ErrorSection>
    </ErrorPageLayout>
  );
};

export default ErrorPage;
