import dayjs from 'dayjs';

export const formatDate = (date?: string | Date, format?: string) => {
  if (!date) return '';

  return dayjs(date).format(format ?? 'h:mm A');
};
