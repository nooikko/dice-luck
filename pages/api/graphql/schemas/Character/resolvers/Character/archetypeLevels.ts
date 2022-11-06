import { logger } from '$helpers-client';
import { Character, ResolverFnWithParent } from '$types';
import { ArchetypeLevel } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const archetypeLevels: ResolverFnWithParent<Character, never, Promise<ArchetypeLevel[]>> = async ({ id }, __, { prisma }) => {
  try {
    const archetypeLevels = await prisma.character
      .findUnique({
        where: {
          id,
        },
      })
      .archetypeLevels();

    return archetypeLevels;
  } catch (error) {
    logger.error('archetypeLevels', error);
    throw new ApolloError(`An error occurred getting archetypeLevels for character with id ${id}`);
  }
};
