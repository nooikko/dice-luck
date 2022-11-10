import { logger } from '$helpers-server';
import { QueryGetRollArgs, ResolverFn } from '$types';
import { Roll } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const getRoll: ResolverFn<QueryGetRollArgs, Promise<Roll>> = async (_, { id }, { prisma }) => {
  try {
    const roll = await prisma.roll.findUnique({
      where: {
        id,
      },
    });

    return roll;
  } catch (error) {
    logger.error('getRoll', error);
    throw new ApolloError('An error occurred getting roll with id');
  }
};
