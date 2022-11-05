import { logger } from '$helpers-server';
import { QueryGetArchetypeLevelArgs, ResolverFn } from '$types';
import { ArchetypeLevel } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const getArchetypeLevel: ResolverFn<QueryGetArchetypeLevelArgs, Promise<ArchetypeLevel>> = async (_, { id }, { prisma, unpackedToken }) => {
  try {
    const userArchetypeLevels = await prisma.archetypeLevel.findMany({
      where: {
        userId: unpackedToken.id,
      },
    });

    const archetypeLevelIds = userArchetypeLevels.map((archetypeLevel) => archetypeLevel.id);

    if (!archetypeLevelIds.includes(id)) {
      throw new ApolloError('You do not have permission to view this archetype level');
    }

    const archetypeLevel = await prisma.archetypeLevel.findUnique({
      where: {
        id,
      },
    });

    return archetypeLevel as ArchetypeLevel;
  } catch (error) {
    logger.error('getArchetypeLevel', error);
    throw new ApolloError('Error getting archetype level');
  }
};
