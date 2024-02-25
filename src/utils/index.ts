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
