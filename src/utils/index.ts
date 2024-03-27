import { RESUME_FILE_NAME_LIMIT } from '@constants';

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const formattedDate = `
    ${dateObj.getFullYear()}.${(dateObj.getMonth() + 1).toString().padStart(2, '0')}.${dateObj
      .getDate()
      .toString()
      .padStart(2, '0')}
  `;

  return formattedDate;
};

export const manageBodyScroll = (canScroll: boolean) => {
  if (canScroll) {
    document.body.style.overflow = 'auto';
    return;
  }
  document.body.style.overflow = 'hidden';
};

export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

export const getRangeText = ({ min, max }: { min: number; max: number }) => {
  if (min === max) {
    if (min === 0) return '신입';
    if (min === 10) return '10년 +';
    return `${min}년`;
  }

  if (min === 0 && max === 10) return '전체';

  const minText = min === 0 ? '신입' : `${min}년`;
  const maxText = max === 10 ? '10년 +' : `${max}년`;

  return `${minText} ~ ${maxText}`;
};

export const validateFileName = (file: File) => {
  return file.name.length <= RESUME_FILE_NAME_LIMIT;
};

export const validateTitle = (title: string) => {
  return title.trim().length > 0;
};

export const validateYear = (year: number) => {
  return year >= 0;
};

export const validateContent = (content: string) => {
  return content.trim().length > 0;
};
