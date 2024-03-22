import React from 'react';
import { Button } from 'review-me-design-system';
import { Description, NotFoundLayout, NotFoundSection, Title } from './style';

const NotFound = () => {
  return (
    <NotFoundLayout>
      <NotFoundSection>
        <Title>페이지를 찾을 수 없습니다.</Title>
        <Description>올바른 주소를 입력했는지 다시 확인해주세요.</Description>
        <div style={{ display: 'flex' }}>
          <Button variant="default" size="l">
            홈으로 이동
          </Button>
        </div>
      </NotFoundSection>
    </NotFoundLayout>
  );
};

export default NotFound;
