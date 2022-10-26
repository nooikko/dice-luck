import dayjs from 'dayjs';

export const isMagicValid = (date: Date) => {
  return dayjs(date).add(parseInt(process.env.AUTH_TIMEOUT_MINUTES), 'minute').isAfter(dayjs());
};
