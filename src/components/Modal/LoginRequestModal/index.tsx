import React from 'react';
import { Modal } from 'review-me-design-system';
import { LoginButton, DescriptionContainer } from './style';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LoginRequestModal = ({ isOpen, onClose }: Props) => {
  const CLIENT_ID = process.env.DEV_CLIENT_ID;
  const REDIRECT_URI =
    process.env.NODE_ENV === 'development' ? process.env.DEV_REDIRECT_URI : process.env.PROD_REDIRECT_URI;
  const GITHUB_OAUTH_URI = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

  const handleLogin = () => {
    window.location.assign(GITHUB_OAUTH_URI);
  };

  return (
    <Modal modalRootId="modal-root" isOpen={isOpen} onClose={onClose} width="18.75rem">
      <DescriptionContainer>
        <Modal.Title>회원만 사용 가능합니다.</Modal.Title>
        <Modal.Title>로그인 후 이용해주세요.</Modal.Title>
      </DescriptionContainer>
      <LoginButton onClick={handleLogin}>github으로 로그인</LoginButton>
    </Modal>
  );
};

export default LoginRequestModal;
