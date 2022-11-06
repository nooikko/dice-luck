import { logger } from '$helpers-client';
import { Project, ResolverFnWithParent } from '$types';
import { Character } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const characters: ResolverFnWithParent<Project, never, Promise<Character[]>> = async ({ id }, __, { prisma }) => {
  try {
    const characters = await prisma.character.findMany({
      where: {
        projectId: id,
      },
    });

    return characters;
  } catch (error) {
    logger.error('characters', error);
    throw new ApolloError(`An error occurred getting characters for project with id ${id}`);
  }
};
