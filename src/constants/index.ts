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

export const FRIEND_LIST_SIZE = 7;

export const RESUME_FILE_NAME_LIMIT = 30;

export const FAILURE_MESSAGE = {
  RESUME: {
    NOT_SELECTED_FILE: '파일을 선택해주세요.',
    LIMITED_FILE_NAME: `파일 이름은 ${RESUME_FILE_NAME_LIMIT}자 이하로 입력해주세요.`,
    EMPTY_TITLE: '제목을 입력해주세요.',
    NOT_SELECTED_OCCUPATION: '직군을 선택해주세요.',
    NOT_SELECTED_SCOPE: '공개 범위를 선택해주세요.',
    INVALID_YEAR: '경력을 다시 입력해주세요.',
  },
};

export const SUCCESS_MESSAGE = {
  UPLOAD_RESUME: '이력서가 성공적으로 업로드되었습니다.',
  UPDATE_RESUME: '이력서가 성공적으로 수정되었습니다.',
};
