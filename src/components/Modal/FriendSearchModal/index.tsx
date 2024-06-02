import React, { useEffect, useState } from 'react';
import { Icon, Input, Modal } from 'review-me-design-system';
import UserItem from '@components/UserItem';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useMediaQuery from '@hooks/useMediaQuery';
import { useUserContext } from '@contexts/userContext';
import { useFriendList } from '@apis/friendApi';
import { breakPoints } from '@styles/common';
import { IconButton } from '@styles/iconButton';
import { FriendList, Header, SearchUserInstruction } from './style';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FriendSearchModal = ({ isOpen, onClose }: Props) => {
  const { jwt } = useUserContext();
  const { matches: isMobile } = useMediaQuery({ mediaQueryString: breakPoints.mobile });

  const [name, setName] = useState<string>('');

  const {
    data: friendList,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFriendList({ jwt, start: name, enabled: false });
  const { setTarget } = useIntersectionObserver({
    onIntersect: () => {
      fetchNextPage();
    },
    options: { threshold: 0.5 },
  });

  useEffect(() => {
    if (name.length === 0) return;

    const timer = setTimeout(() => {
      refetch();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [name]);

  const isNameEntered = name.length > 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      width={isMobile ? '80%' : '34rem'}
    >
      <Header>
        <Modal.Title>친구</Modal.Title>
        <IconButton aria-label="친구 모달 닫기" onClick={onClose}>
          <Icon iconName="xMark" />
        </IconButton>
      </Header>

      <Input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      {!isNameEntered && (
        <FriendList>
          {friendList?.map((friend) => (
            <UserItem
              key={friend.id}
              type="friend"
              userId={friend.id}
              userImg={friend.profileUrl}
              userName={friend.name}
            />
          ))}
          {hasNextPage && !isFetchingNextPage && <div ref={setTarget}></div>}
        </FriendList>
      )}
      {isNameEntered && friendList && friendList.length > 0 && (
        <FriendList>
          {friendList.map((friend) => (
            <UserItem
              key={friend.id}
              type="friend"
              userId={friend.id}
              userImg={friend.profileUrl}
              userName={friend.name}
            />
          ))}
          {hasNextPage && !isFetchingNextPage && <div ref={setTarget}></div>}
        </FriendList>
      )}
      {isNameEntered && friendList && friendList.length === 0 && (
        <SearchUserInstruction>검색어와 일치하는 친구가 없습니다.</SearchUserInstruction>
      )}
    </Modal>
  );
};

export default FriendSearchModal;
