import { logger } from '$helpers-server';
import { ResolverFn } from '$types';
import { User } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const getMe: ResolverFn<null, Promise<User>> = async (_, __, { prisma, unpackedToken }) => {
  try {
    const me = await prisma.user.findUnique({
      where: {
        id: unpackedToken?.id,
      },
    });

    return me;
  } catch (error) {
    logger.error('getMe', error);
    throw new ApolloError('An error occurred getting user');
  }
};
