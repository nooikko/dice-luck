import { logger } from '$helpers-client';
import { Project, ResolverFnWithParent } from '$types';
import { User } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const owner: ResolverFnWithParent<Project, never, Promise<User>> = async ({ id }, __, { prisma }) => {
  try {
    const owner = await prisma.project
      .findUnique({
        where: {
          id,
        },
      })
      .owner();

    return owner;
  } catch (error) {
    logger.error('owner', error);
    throw new ApolloError(`An error occurred getting owner for project with id ${id}`);
  }
};
