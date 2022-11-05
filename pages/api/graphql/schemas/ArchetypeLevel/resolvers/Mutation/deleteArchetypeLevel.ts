import { logger } from '$helpers-server';
import { MutationDeleteArchetypeLevelArgs, ResolverFn } from '$types';
import { ApolloError } from 'apollo-server-micro';

export const deleteArchetypeLevel: ResolverFn<MutationDeleteArchetypeLevelArgs, Promise<boolean>> = async (_, { id }, { prisma, unpackedToken }) => {
  try {
    const userArchetypeLevels = await prisma.archetypeLevel.findMany({
      where: {
        userId: unpackedToken.id,
      },
    });

    const archetypeLevelIds = userArchetypeLevels.map((archetypeLevel) => archetypeLevel.id);

    if (!archetypeLevelIds.includes(id)) {
      throw new ApolloError('You do not have permission to delete this archetype level');
    }

    await prisma.archetypeLevel.delete({
      where: {
        id: id,
      },
    });

    return true;
  } catch (error) {
    logger.error('deleteArchetypeLevel', error);
    throw new ApolloError('Error deleting archetype level');
  }
};
