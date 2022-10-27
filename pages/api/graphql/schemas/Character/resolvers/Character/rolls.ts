import { logger } from '$helpers-client';
import { Character, ResolverFnWithParent } from '$types';
import { Roll } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const rolls: ResolverFnWithParent<Character, never, Promise<Roll[]>> = async ({ id }, __, { prisma }) => {
  try {
    const rolls = await prisma.roll.findMany({
      where: {
        characterId: id,
      },
    });

    return rolls;
  } catch (error) {
    logger.error('rolls', error);
    throw new ApolloError(`An error occurred getting rolls for character with id ${id}`);
  }
};
