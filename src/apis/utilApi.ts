import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { REQUEST_URL } from '@constants';
import { apiClient } from './apiClient';

// GET 직군 목록 조회
export interface Occupation {
  id: number;
  occupation: string;
}

interface GetOccupationList {
  occupations: Occupation[];
}

export const getOccupationList = async () => {
  const data = apiClient.get<GetOccupationList>(REQUEST_URL.OCCUPATION);
  const { occupations } = await data;

  return occupations;
};

export const useOccupationList = () => {
  return useQuery({
    queryKey: ['occupationList'],
    queryFn: getOccupationList,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

// GET 공개 범위 목록 조회
export interface Scope {
  id: number;
  scope: string;
}

interface GetScopeList {
  scopes: Scope[];
}

export const getScopeList = async () => {
  const data = apiClient.get<GetScopeList>(REQUEST_URL.SCOPE);
  const { scopes } = await data;

  return scopes;
};

export const useScopeList = () => {
  return useQuery({ queryKey: ['scopeList'], queryFn: getScopeList, staleTime: Infinity, gcTime: Infinity });
};

// GET 이모지 목록 조회
interface Emoji {
  id: number;
  emoji: string;
}

interface GetEmojiList {
  emojis: Emoji[];
}

export const getEmojiList = async () => {
  const data = apiClient.get<GetEmojiList>(REQUEST_URL.EMOJI);
  const { emojis } = await data;

  return emojis;
};

export const useEmojiList = () => {
  return useSuspenseQuery({
    queryKey: ['emojiList'],
    queryFn: getEmojiList,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

// GET 라벨 목록 조회
export interface FeedbackLabel {
  id: number;
  label: string;
}

interface GetFeedbackLabelList {
  labels: FeedbackLabel[];
}

export const getFeedbackLabelList = async () => {
  const data = apiClient.get<GetFeedbackLabelList>(REQUEST_URL.LABEL);
  const { labels } = await data;

  return labels;
};

export const useFeedbackLabelList = () => {
  return useQuery({
    queryKey: ['feedbackLabelList'],
    queryFn: getFeedbackLabelList,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
