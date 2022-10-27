import { logger } from '$helpers-client';
import { ResolverFn } from '$types';
import { User } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

/**
 * Rsolver for the getUser query
 * @param _ The parent resolver
 * @param param1 The arguments passed to the resolver
 * @param param2 The context passed to the resolver
 * @returns The user
 */
export const getUser: ResolverFn<never, Promise<User>> = async (_, __, { prisma, unpackedToken: { id } }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    logger.error('getUser', error);
    throw new ApolloError(`An error occurred getting user with id ${id}`);
  }
};
