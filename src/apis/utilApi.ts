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
  return useQuery({ queryKey: ['occupationList'], queryFn: getOccupationList });
};
