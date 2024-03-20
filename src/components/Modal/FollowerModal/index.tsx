import React, { useEffect, useState } from 'react';
import { Icon, Input, Modal } from 'review-me-design-system';
import FriendItem from '@components/FriendItem';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useMediaQuery from '@hooks/useMediaQuery';
import { useUserContext } from '@contexts/userContext';
import { useFollowerList } from '@apis/friendApi';
import { Header, IconButton, SearchUserInstruction, UserList } from './style';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FollowerModal = ({ isOpen, onClose }: Props) => {
  const SIZE = 7;
  const { jwt } = useUserContext();
  const { matches: isMDevice } = useMediaQuery({ mediaQueryString: '(max-width: 768px)' });

  const [name, setName] = useState<string>('');

  const { data: followerListData, refetch, fetchNextPage } = useFollowerList({ jwt, start: name });
  const { setTarget } = useIntersectionObserver({
    onIntersect: () => {
      fetchNextPage();
    },
    options: { threshold: 0.5 },
  });

  const followerList = followerListData?.pages.map((page) => page.users).flat();

  const handleClose = () => {
    onClose();
    setName('');
  };

  useEffect(() => {
    if (name.length === 0) return;

    const timer = setTimeout(() => {
      refetch();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [name]);

  return (
    <Modal
      modalRootId="modal-root"
      isOpen={isOpen}
      onClose={handleClose}
      width={isMDevice ? '80%' : '37.5rem'}
    >
      <Header>
        <Modal.Title>친구 요청에 응답하기</Modal.Title>
        <IconButton onClick={handleClose}>
          <Icon iconName="xMark" />
        </IconButton>
      </Header>

      <Input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      {followerList && followerList.length > 0 && (
        <UserList>
          {followerList.map((user) => (
            <FriendItem
              key={user.id}
              type="response"
              userId={user.id}
              userImg={user.profileUrl}
              userName={user.name}
            />
          ))}
          {followerList.length >= SIZE && <div ref={setTarget}></div>}
        </UserList>
      )}
      {name.length > 0 && followerList && followerList.length === 0 && (
        <SearchUserInstruction>검색어와 일치하는 사용자가 없습니다.</SearchUserInstruction>
      )}
    </Modal>
  );
};

export default FollowerModal;
