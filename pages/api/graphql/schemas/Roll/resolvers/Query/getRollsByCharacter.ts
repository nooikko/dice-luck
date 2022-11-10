import { logger } from '$helpers-server';
import { QueryGetRollsByCharacterArgs, ResolverFn } from '$types';
import { Roll } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const getRollsByCharacter: ResolverFn<QueryGetRollsByCharacterArgs, Promise<Roll[]>> = async (_, { id }, { prisma }) => {
  try {
    const rolls = await prisma.roll.findMany({
      where: {
        characterId: id,
      },
    });

    return rolls;
  } catch (error) {
    logger.error('getRollsByCharacter', error);
    throw new ApolloError('An error occurred getting rolls');
  }
};
