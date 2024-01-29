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
