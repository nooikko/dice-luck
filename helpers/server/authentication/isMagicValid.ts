import dayjs from 'dayjs';

/**
 * Check if the magic link is valid
 * @param date The date to check
 * @returns A boolean indicating if the date is valid
 */
export const isMagicValid = (date: Date) => {
  const referenceDate = dayjs(date).add(parseInt(process.env.AUTH_TIMEOUT_MINUTES), 'minute');
  return referenceDate.isAfter(dayjs());
};
