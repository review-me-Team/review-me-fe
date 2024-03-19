import React, { useEffect, useState } from 'react';
import { Icon, Input, Modal } from 'review-me-design-system';
import FriendItem from '@components/FriendItem';
import useMediaQuery from '@hooks/useMediaQuery';
import { useUserContext } from '@contexts/userContext';
import { useFriendList } from '@apis/friendApi';
import { FriendList, Header, IconButton, SearchUserInstruction } from './style';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FriendSearchModal = ({ isOpen, onClose }: Props) => {
  const { jwt } = useUserContext();
  const { matches: isMDevice } = useMediaQuery({ mediaQueryString: '(max-width: 768px)' });

  const [name, setName] = useState<string>('');

  const { data: friendListData, refetch } = useFriendList({ jwt, start: name, enabled: false });

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
      width={isMDevice ? '80%' : '37.5rem'}
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

      {name.length > 0 ? (
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
        </FriendList>
      ) : (
        <SearchUserInstruction>친구의 이름을 검색해주세요.</SearchUserInstruction>
      )}
    </Modal>
  );
};

export default FriendSearchModal;
