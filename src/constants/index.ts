export const ROUTE_PATH = {
  ROOT: '/',
  MY_PAGE: '/my-page',
  RESUME: '/resume',
  MY_RESUME: '/my-resume',
  RESUME_UPLOAD: '/resume-upload',
  RESUME_UPDATE: '/resume-update',
  SOCIAL_LOGIN: '/path',
} as const;

const BASE_URL = process.env.BASE_URL;

export const REQUEST_URL = {
  FRIEND: `${BASE_URL}/friend`,
  USER: `${BASE_URL}/user`,
  RESUME: `${BASE_URL}/resume`,
  MY_RESUME: `${BASE_URL}/resume/my`,
  LABEL: `${BASE_URL}/label`,
  OCCUPATION: `${BASE_URL}/occupation`,
  EMOJI: `${BASE_URL}/emoji`,
  SCOPE: `${BASE_URL}/scope`,
  OAUTH: `${BASE_URL}/login/oauth`,
  RENEW_JWT: `${BASE_URL}/user/refresh`,
} as const;

export const PDF_VIEWER_SCALE = {
  MAX_SCALE: 2,
  MIN_SCALE: 0.6,
  SCALE_STEP: 0.2,
} as const;

export const IS_LOGGED_IN_KEY = 'isLoggedIn';

export const REPLY_LIST_SIZE = 4;
