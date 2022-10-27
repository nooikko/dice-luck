import { logger } from '$helpers-client';
import { ResolverFn } from '$types';
import { Class } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const getClasses: ResolverFn<never, Promise<Class[]>> = async (_, __, { prisma }) => {
  try {
    const classes = await prisma.class.findMany();

    return classes;
  } catch (error) {
    logger.error('getClasses', error);
    throw new ApolloError('An error occurred while getting the classes');
  }
};
