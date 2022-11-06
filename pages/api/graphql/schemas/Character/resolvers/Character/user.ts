import { logger } from '$helpers-client';
import { Character, ResolverFnWithParent } from '$types';
import { User } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const user: ResolverFnWithParent<Character, never, Promise<User>> = async ({ id }, __, { prisma }) => {
  try {
    const user = await prisma.character
      .findUnique({
        where: {
          id,
        },
      })
      .user();

    return user;
  } catch (error) {
    logger.error('user', error);
    throw new ApolloError(`An error occurred getting user for character with id ${id}`);
  }
};
