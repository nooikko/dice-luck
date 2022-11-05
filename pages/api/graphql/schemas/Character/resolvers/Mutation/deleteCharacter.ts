import { logger } from '$helpers-server';
import { Mutation, MutationDeleteProjectArgs, ResolverFn } from '$types';
import { ApolloError } from 'apollo-server-micro';

export const deleteCharacter: ResolverFn<MutationDeleteProjectArgs, Promise<Mutation['deleteProject']>> = async (
  _,
  { id },
  { prisma, unpackedToken },
) => {
  try {
    const userCharacters = await prisma.character.findMany({
      where: {
        userId: unpackedToken.id,
      },
    });

    const characterIds = userCharacters.map((character) => character.id);

    if (!characterIds.includes(id)) {
      throw new ApolloError('You do not have permission to delete this character');
    }

    await prisma.project.delete({
      where: {
        id,
      },
    });

    return true;
  } catch (error) {
    logger.error('deleteProject', error);
    throw new ApolloError(`An error occurred deleting project with id ${id}`);
  }
};
