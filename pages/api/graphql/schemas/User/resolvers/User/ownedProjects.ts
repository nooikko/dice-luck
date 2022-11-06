import { logger } from '$helpers-client';
import { ResolverFnWithParent } from '$types';
import { Project, User } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const ownedProjects: ResolverFnWithParent<User, never, Promise<Project[]>> = async ({ id }, __, { prisma }) => {
  try {
    const projects = await prisma.user
      .findUnique({
        where: {
          id,
        },
      })
      .ownedProjects();

    return projects;
  } catch (error) {
    logger.error('ownedProjects', error);
    throw new ApolloError(`An error occurred getting ownedProjects for user with id ${id}`);
  }
};
