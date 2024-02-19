import { useInfiniteQuery } from '@tanstack/react-query';
import { REQUEST_URL } from '@constants';
import { ApiResponse, PageNationData } from './response.types';
import { Emoji } from './utilApi';

export interface Comment {
  id: number;
  content: string;
  commenterId: number;
  commenterName: string;
  commenterProfileUrl: string;
  createdAt: string;
  emojis: Emoji[];
  myEmojiId: number;
}

type CommentList = Comment[];

interface GetCommentList extends PageNationData {
  comments: CommentList;
}

export const getCommentList = async ({ resumeId, pageParam }: { resumeId: number; pageParam: number }) => {
  const response = await fetch(`${REQUEST_URL.RESUME}/${resumeId}/comment?page=${pageParam}`);

  if (!response.ok) {
    throw response;
  }

  const { data }: ApiResponse<GetCommentList> = await response.json();

  return data;
};

interface UseCommentListProps {
  resumeId: number;
}

export const useCommentList = ({ resumeId }: UseCommentListProps) => {
  return useInfiniteQuery({
    queryKey: ['commentList', resumeId],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getCommentList({ resumeId, pageParam }),
    getNextPageParam: (lastPage) => {
      const { pageNumber, lastPage: lastPageNum } = lastPage;

      return pageNumber < lastPageNum ? pageNumber + 1 : null;
    },
  });
};
