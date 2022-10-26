import { Client } from 'postmark';
import { logger } from '$helpers-server';

const FROM_EMAIL = process.env.POSTMARK_FROM_EMAIL || 'fake';
const API_TOKEN = process.env.POSTMARK_API_TOKEN || 'fake';

const client = new Client(API_TOKEN);

interface SendEmailInput {
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = (input: SendEmailInput) => {
  if (process.env.NODE_ENV === 'development') {
    logger.info('sendEmail', 'Not sending email in development:');
    console.log(`To: ${input.to}`); // eslint-disable-line no-console
    console.log(`Subject: ${input.subject}`); // eslint-disable-line no-console
    console.log(input.text); // eslint-disable-line no-console
    return;
  }

  if (API_TOKEN === 'fake') {
    const error = new Error('Please specify the POSTMARK_API_TOKEN env variables.');
    logger.error('sendEmail', error);
  }

  if (!FROM_EMAIL) {
    const error = new Error('Please specify the POSTMARK_FROM_EMAIL env variables.');
    logger.error('sendEmail', error);
  }

  if (API_TOKEN === 'fake' || FROM_EMAIL === 'fake') {
    return;
  }

  return client.sendEmail({
    From: FROM_EMAIL,
    To: input.to,
    Subject: input.subject,
    TextBody: input.text,
  });
};
