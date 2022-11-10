import { logger } from '$helpers-server';
import { QueryGetRollsByUserArgs, ResolverFn } from '$types';
import { Roll } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const getRollsByUser: ResolverFn<QueryGetRollsByUserArgs, Promise<Roll[]>> = async (_, { id }, { prisma }) => {
  try {
    const rolls = await prisma.roll.findMany({
      where: {
        userId: id,
      },
    });

    return rolls;
  } catch (error) {
    logger.error('getRollsByUser', error);
    throw new ApolloError('An error occurred getting rolls');
  }
};
