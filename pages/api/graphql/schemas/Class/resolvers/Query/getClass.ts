import { logger } from '$helpers-client';
import { QueryGetClassArgs, ResolverFn } from '$types';
import { Class } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const getClass: ResolverFn<QueryGetClassArgs, Promise<Class>> = async (_, { id }, { prisma }) => {
  try {
    const character = await prisma.class.findUnique({
      where: {
        id,
      },
    });

    return character;
  } catch (error) {
    logger.error('getClass', error);
    throw new ApolloError(`An error occurred getting class with id ${id}`);
  }
};
