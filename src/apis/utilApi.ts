import { useQuery } from '@tanstack/react-query';
import { REQUEST_URL } from '@constants';
import { ApiResponse } from './response.types';

// GET 직군 목록 조회
export interface Occupation {
  id: number;
  occupation: string;
}

interface GetOccupationList {
  occupations: Occupation[];
}

export const getOccupationList = async () => {
  const response = await fetch(REQUEST_URL.OCCUPATION);

  if (!response.ok) {
    throw response;
  }

  const {
    data: { occupations },
  }: ApiResponse<GetOccupationList> = await response.json();

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
  const response = await fetch(REQUEST_URL.SCOPE);

  if (!response.ok) {
    throw response;
  }

  const {
    data: { scopes },
  }: ApiResponse<GetScopeList> = await response.json();

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
  const response = await fetch(REQUEST_URL.EMOJI);

  if (!response.ok) {
    throw response;
  }

  const {
    data: { emojis },
  }: ApiResponse<GetEmojiList> = await response.json();

  return emojis;
};

export const useEmojiList = () => {
  return useQuery({ queryKey: ['emojiList'], queryFn: getEmojiList });
};

// GET 라벨 목록 조회
export interface Label {
  id: number;
  label: string;
}

interface GetLabelList {
  labels: Label[];
}

export const getLabelList = async () => {
  const response = await fetch(REQUEST_URL.LABEL);

  if (!response.ok) {
    throw response;
  }

  const {
    data: { labels },
  }: ApiResponse<GetLabelList> = await response.json();

  return labels;
};

export const useLabelList = () => {
  return useQuery({ queryKey: ['labelList'], queryFn: getLabelList });
};
