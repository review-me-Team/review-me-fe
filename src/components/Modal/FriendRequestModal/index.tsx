import React, { useEffect, useState } from 'react';
import { Icon, Input, Modal } from 'review-me-design-system';
import FriendItem from '@components/FriendItem';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useMediaQuery from '@hooks/useMediaQuery';
import { useUserContext } from '@contexts/userContext';
import { useUserList } from '@apis/userApi';
import { breakPoints } from '@styles/common';
import { UserList, Header, IconButton, SearchUserInstruction } from './style';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FriendRequestModal = ({ isOpen, onClose }: Props) => {
  const { jwt } = useUserContext();
  const { matches: isMobile } = useMediaQuery({ mediaQueryString: breakPoints.mobile });

  const [name, setName] = useState<string>('');

  const { data: userListData, refetch, fetchNextPage } = useUserList({ jwt, start: name });
  const { setTarget } = useIntersectionObserver({
    onIntersect: () => {
      fetchNextPage();
    },
    options: { threshold: 0.5 },
  });

  const userList = userListData?.pages.map((page) => page.users).flat();

  useEffect(() => {
    if (name.length === 0) return;

    const timer = setTimeout(() => {
      refetch();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [name]);

  const handleClose = () => {
    onClose();
    setName('');
  };

  return (
    <Modal modalRootId="modal-root" isOpen={isOpen} onClose={handleClose} width={isMobile ? '80%' : '34rem'}>
      <Header>
        <Modal.Title>친구 추가하기</Modal.Title>
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

      {name.length === 0 && <SearchUserInstruction>사용자 이름을 검색해주세요.</SearchUserInstruction>}
      {name.length > 0 && userList && userList.length > 0 && (
        <UserList>
          {userList.map((user) => (
            <FriendItem
              key={user.id}
              type="none"
              userId={user.id}
              userImg={user.profileUrl}
              userName={user.name}
            />
          ))}
          <div ref={setTarget}></div>
        </UserList>
      )}
      {name.length > 0 && userList && userList.length === 0 && (
        <SearchUserInstruction>검색어와 일치하는 사용자가 없습니다.</SearchUserInstruction>
      )}
    </Modal>
  );
};

export default FriendRequestModal;
