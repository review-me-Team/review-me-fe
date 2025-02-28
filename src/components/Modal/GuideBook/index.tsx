import React, { useState } from 'react';
import feedbackCheckVideo from '@assets/feedback-check.mp4';
import feedbackListVideo from '@assets/feedback-list.mp4';
import questionBookMarkVideo from '@assets/question-bookmark.mp4';
import questionCheckVideo from '@assets/question-check.mp4';
import questionListVideo from '@assets/question-list.mp4';
import { Button, Icon, Modal } from 'review-me-design-system';
import useMediaQuery from '@hooks/useMediaQuery';
import { breakPoints } from '@styles/common';
import { IconButton } from '@styles/iconButton';
import { ButtonContainer, Description, GuideSection, SubDescription, Video } from './style';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const GuideBook = ({ isOpen, onClose }: Props) => {
  const INIT_GUIDE = 0;
  const MIN_GUIDE = 1;
  const MAX_GUIDE = 5;
  const [currentGuide, setCurrentGuide] = useState<number>(INIT_GUIDE);

  const { matches: isMobile } = useMediaQuery({ mediaQueryString: breakPoints.mobile });

  const handleNextGuide = () => {
    if (currentGuide < MAX_GUIDE) setCurrentGuide(currentGuide + 1);
  };

  const handlePrevGuide = () => {
    if (currentGuide > MIN_GUIDE) setCurrentGuide(currentGuide - 1);
  };

  return (
    <>
      {currentGuide === 0 && (
        <Modal isOpen={isOpen} onClose={onClose} width={isMobile ? '90%' : 'fit-content'}>
          <Description>
            <Modal.Title>Review Me를 처음 이용하시나요?</Modal.Title>
            <Modal.Description>Review Me 사용법을 알려드립니다!</Modal.Description>
          </Description>
          <ButtonContainer>
            <Button variant="outline" size="s" onClick={onClose}>
              skip
            </Button>
            <Button variant="default" size="s" onClick={handleNextGuide}>
              next
            </Button>
          </ButtonContainer>
        </Modal>
      )}
      {currentGuide === 1 && (
        <Modal isOpen={isOpen} onClose={onClose} width={isMobile ? '90%' : 'fit-content'}>
          <GuideSection>
            <div>
              <Description>
                <Modal.Title>피드백</Modal.Title>
                <Modal.Description>현재 이력서 페이지에 대한 피드백 목록이 표시됩니다.</Modal.Description>
                <SubDescription>
                  ex&#41; 현재 이력서가 1페이지라면, 1페이지에 달린 피드백이 보입니다.
                </SubDescription>
              </Description>
              <Video src={feedbackListVideo} itemType="video/mp4" autoPlay muted loop playsInline />
            </div>

            <ButtonContainer>
              <Button variant="default" size="s" onClick={onClose}>
                닫기
              </Button>
              <NextStepButton onClick={handleNextGuide} />
            </ButtonContainer>
          </GuideSection>
        </Modal>
      )}
      {currentGuide === 2 && (
        <Modal isOpen={isOpen} onClose={onClose} width={isMobile ? '90%' : 'fit-content'}>
          <div>
            <Description>
              <Modal.Title>피드백 check</Modal.Title>
              <Modal.Description>해결된 피드백이라면 check 아이콘을 눌러주세요.</Modal.Description>
            </Description>
            <Video src={feedbackCheckVideo} itemType="video/mp4" autoPlay muted loop playsInline />
          </div>

          <ButtonContainer>
            <PreviousStepButton onClick={handlePrevGuide} />
            <Button variant="default" size="s" onClick={onClose}>
              닫기
            </Button>
            <NextStepButton onClick={handleNextGuide} />
          </ButtonContainer>
        </Modal>
      )}
      {currentGuide === 3 && (
        <Modal isOpen={isOpen} onClose={onClose} width={isMobile ? '90%' : 'fit-content'}>
          <div>
            <Description>
              <Modal.Title>예상질문</Modal.Title>
              <Modal.Description>현재 이력서 페이지에 대한 예상질문 목록이 표시됩니다.</Modal.Description>
              <SubDescription>
                ex&#41; 현재 이력서가 1페이지라면, 1페이지에 달린 예상질문이 보입니다.
              </SubDescription>
            </Description>
            <Video src={questionListVideo} itemType="video/mp4" autoPlay muted loop playsInline />
          </div>

          <ButtonContainer>
            <PreviousStepButton onClick={handlePrevGuide} />
            <Button variant="default" size="s" onClick={onClose}>
              닫기
            </Button>
            <NextStepButton onClick={handleNextGuide} />
          </ButtonContainer>
        </Modal>
      )}
      {currentGuide === 4 && (
        <Modal isOpen={isOpen} onClose={onClose} width={isMobile ? '90%' : 'fit-content'}>
          <div>
            <Description>
              <Modal.Title>예상질문 check</Modal.Title>
              <Modal.Description>해결된 예상질문이라면 check 아이콘을 눌러주세요.</Modal.Description>
            </Description>
            <Video src={questionCheckVideo} itemType="video/mp4" autoPlay muted loop playsInline />
          </div>

          <ButtonContainer>
            <PreviousStepButton onClick={handlePrevGuide} />
            <Button variant="default" size="s" onClick={onClose}>
              닫기
            </Button>
            <NextStepButton onClick={handleNextGuide} />
          </ButtonContainer>
        </Modal>
      )}
      {currentGuide === 5 && (
        <Modal isOpen={isOpen} onClose={onClose} width={isMobile ? '90%' : 'fit-content'}>
          <div>
            <Description>
              <Modal.Title>예상질문 bookmark</Modal.Title>
              <Modal.Description>기억하고 싶은 예상질문은 bookmark 아이콘을 눌러주세요.</Modal.Description>
            </Description>
            <Video src={questionBookMarkVideo} itemType="video/mp4" autoPlay muted loop playsInline />
          </div>

          <ButtonContainer>
            <PreviousStepButton onClick={handlePrevGuide} />
            <Button variant="default" size="s" onClick={onClose}>
              start!
            </Button>
          </ButtonContainer>
        </Modal>
      )}
    </>
  );
};

export default GuideBook;

const PreviousStepButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <IconButton aria-label="이전 가이드 보기" onClick={onClick}>
      <Icon iconName="leftArrow" width={24} height={24} />
    </IconButton>
  );
};

const NextStepButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <IconButton aria-label="다음 가이드 보기" onClick={onClick}>
      <Icon iconName="rightArrow" width={24} height={24} />
    </IconButton>
  );
};
