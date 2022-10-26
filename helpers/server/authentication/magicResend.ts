import { User } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';
import { logger, sendEmail } from '$helpers-server';
import { prisma } from '$prisma';

export const magicResend = async (userId: User['id']) => {
  if (!userId) {
    const error = new Error('Attempted to resend magicLogin but no userId was provided');
    logger.error('magicResend', error);
    throw new ApolloError(error as unknown as string);
  }

  try {
    const { slug } = await prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .magicLink();

    sendEmail({
      subject: 'Application Magic Link',
      to: 'test@test.com',
      text: slug,
    });

    return true;
  } catch (error) {
    logger.error('magicResend', error);

    return false;
  }
};
