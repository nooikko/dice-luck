import twilio from 'twilio';
import { logger } from '$helpers-server';

const environmentVariables = {
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || 'fake',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || 'fake',
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || 'fake',
};

interface SendTextInput {
  to: string;
  body: string;
}

/**
 * Sends a text message to the provided phone number
 * @param input The input to send a text
 * @returns The result of the text
 */
export const sendText = (input: SendTextInput) => {
  if (process.env.NODE_ENV === 'development') {
    logger.info('sendText', 'Not sending text in development:');
    console.log(`To: ${input.to}`); // eslint-disable-line no-console
    console.log(input.body); // eslint-disable-line no-console
    return;
  }

  Object.keys(environmentVariables).forEach((key) => {
    if (environmentVariables[key] === 'fake') {
      const error = new Error(`Please specify the ${key} env variables.`);
      logger.error('sendText', error);
    }
  });

  if (Object.values(environmentVariables).includes('fake')) {
    return;
  }

  const client = twilio(environmentVariables.TWILIO_ACCOUNT_SID, environmentVariables.TWILIO_AUTH_TOKEN);

  return client.messages.create({
    body: input.body,
    from: environmentVariables.TWILIO_PHONE_NUMBER,
    to: input.to,
  });
};
