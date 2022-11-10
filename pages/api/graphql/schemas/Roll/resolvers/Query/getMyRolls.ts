import { logger } from '$helpers-server';
import { ResolverFn } from '$types';
import { Roll } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const getMyRolls: ResolverFn<never, Promise<Roll[]>> = async (_, __, { prisma, unpackedToken }) => {
  try {
    const rolls = await prisma.roll.findMany({
      where: {
        userId: unpackedToken?.id,
      },
    });

    return rolls;
  } catch (error) {
    logger.error('getMyRolls', error);
    throw new ApolloError('An error occurred getting rolls');
  }
};
