export const ROUTE_PATH = {
  ROOT: '/',
  MY_PAGE: '/my-page',
  RESUME: '/resume',
  MY_RESUME: '/my-resume',
  RESUME_UPLOAD: '/resume-upload',
} as const;

const BASE_URL = process.env.BASE_URL;

export const REQUEST_URL = {
  FRIEND: `${BASE_URL}/friend`,
  RESUME: `${BASE_URL}/resume`,
  LABEL: `${BASE_URL}/label`,
  OCCUPATION: `${BASE_URL}/occupation`,
  EMOJI: `${BASE_URL}/emoji`,
  SCOPE: `${BASE_URL}/scope`,
} as const;
