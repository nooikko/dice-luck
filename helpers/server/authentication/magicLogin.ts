import { User } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';
import crypto from 'crypto';
import { logger, sendEmail } from '$helpers-server';
import { prisma } from '$prisma';

export const magicLogin = async (userId: User['id']) => {
  if (!userId) {
    const error = new Error('Attempted to use magicLogin but no userId was provided');
    logger.error('magicLogin', error);
    throw new ApolloError(error as unknown as string);
  }

  try {
    const slug = crypto.randomBytes(48).toString('hex');
    const publicKey = crypto.randomBytes(48).toString('hex');

    await prisma.magicLink.create({
      data: {
        createdAt: new Date(),
        slug,
        publicKey,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    sendEmail({
      subject: 'Application Magic Link',
      to: 'test@test.com',
      text: slug,
    });
  } catch (error) {
    logger.error('magicLogin', error);
  }
};
