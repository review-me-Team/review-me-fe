import React, { useEffect, useState } from 'react';
import { Icon, Input, Modal } from 'review-me-design-system';
import FriendItem from '@components/FriendItem';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useMediaQuery from '@hooks/useMediaQuery';
import { useUserContext } from '@contexts/userContext';
import { useFriendList } from '@apis/friendApi';
import { breakPoints } from '@styles/common';
import { FriendList, Header, IconButton, SearchUserInstruction } from './style';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FriendSearchModal = ({ isOpen, onClose }: Props) => {
  const { jwt } = useUserContext();
  const { matches: isMobile } = useMediaQuery({ mediaQueryString: breakPoints.mobile });

  const [name, setName] = useState<string>('');

  const {
    data: friendListData,
    refetch,
    fetchNextPage,
  } = useFriendList({ jwt, start: name, enabled: false });
  const { setTarget } = useIntersectionObserver({
    onIntersect: () => {
      fetchNextPage();
    },
    options: { threshold: 0.5 },
  });

  const friendList = friendListData?.pages.map((page) => page.users).flat();

  useEffect(() => {
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
      onClose={() => {
        onClose();
      }}
      width={isMobile ? '80%' : '34rem'}
    >
      <Header>
        <Modal.Title>친구</Modal.Title>
        <IconButton onClick={onClose}>
          <Icon iconName="xMark" />
        </IconButton>
      </Header>

      <Input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      {name.length === 0 && (
        <FriendList>
          {friendList?.map((friend) => (
            <FriendItem
              key={friend.id}
              type="friend"
              userId={friend.id}
              userImg={friend.profileUrl}
              userName={friend.name}
            />
          ))}
          <div ref={setTarget}></div>
        </FriendList>
      )}
      {name.length > 0 && friendList && friendList.length > 0 && (
        <FriendList>
          {friendList.map((friend) => (
            <FriendItem
              key={friend.id}
              type="friend"
              userId={friend.id}
              userImg={friend.profileUrl}
              userName={friend.name}
            />
          ))}
          <div ref={setTarget}></div>
        </FriendList>
      )}
      {name.length > 0 && friendList && friendList.length === 0 && (
        <SearchUserInstruction>검색어와 일치하는 친구가 없습니다.</SearchUserInstruction>
      )}
    </Modal>
  );
};

export default FriendSearchModal;
