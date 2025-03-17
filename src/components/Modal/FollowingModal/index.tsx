import { useEffect, useState } from 'react';
import { Icon, Input, Modal } from 'review-me-design-system';
import UserItem from '@components/UserItem';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useMediaQuery from '@hooks/useMediaQuery';
import { useUserContext } from '@contexts/userContext';
import { useFollowingList } from '@apis/friendApi';
import { breakPoints } from '@styles/common';
import { IconButton } from '@styles/iconButton';
import { Header, SearchUserInstruction, UserList } from './style';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FollowingModal = ({ isOpen, onClose }: Props) => {
  const { jwt } = useUserContext();
  const { matches: isMobile } = useMediaQuery({ mediaQueryString: breakPoints.mobile });

  const [name, setName] = useState<string>('');

  const {
    data: followingList,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFollowingList({ jwt, start: name, enabled: name.length === 0 });
  const { setTarget } = useIntersectionObserver({
    onIntersect: () => {
      fetchNextPage();
    },
    options: { threshold: 0.5 },
  });

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
    <Modal isOpen={isOpen} onClose={handleClose} width={isMobile ? '80%' : '34rem'}>
      <Header>
        <Modal.Title>전송한 친구 요청 보기</Modal.Title>
        <IconButton aria-label="전송한 친구 요청 보기 모달 닫기" onClick={handleClose}>
          <Icon iconName="xMark" />
        </IconButton>
      </Header>

      <Input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      {followingList && followingList.length > 0 && (
        <UserList>
          {followingList.map((user) => (
            <UserItem
              key={user.id}
              type="following"
              userId={user.id}
              userImg={user.profileUrl}
              userName={user.name}
            />
          ))}
          {hasNextPage && !isFetchingNextPage && <div ref={setTarget}></div>}
        </UserList>
      )}
      {name.length > 0 && followingList && followingList.length === 0 && (
        <SearchUserInstruction>검색어와 일치하는 친구가 없습니다.</SearchUserInstruction>
      )}
    </Modal>
  );
};

export default FollowingModal;
