import { logger } from '$helpers-client';
import { Project, ResolverFnWithParent } from '$types';
import { User, ProjectUserRelation } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const users: ResolverFnWithParent<Project, never, Promise<User[]>> = async ({ id }, __, { prisma }) => {
  try {
    const projectUserRelations = await prisma.projectUserRelation.findMany({
      where: {
        projectId: id,
      },
    });

    const users = await prisma.user.findMany({
      where: {
        id: {
          in: projectUserRelations.map((projectUserRelation: ProjectUserRelation) => projectUserRelation.userId),
        },
      },
    });

    return users;
  } catch (error) {
    logger.error('users', error);
    throw new ApolloError(`An error occurred getting users for project with id ${id}`);
  }
};
