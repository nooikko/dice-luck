import { logger } from '$helpers-client';
import { Character, ResolverFnWithParent } from '$types';
import { Project } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const project: ResolverFnWithParent<Character, never, Promise<Project>> = async ({ id }, __, { prisma }) => {
  try {
    const project = await prisma.character
      .findUnique({
        where: {
          id,
        },
      })
      .project();

    return project;
  } catch (error) {
    logger.error('project', error);
    throw new ApolloError(`An error occurred getting project for character with id ${id}`);
  }
};
