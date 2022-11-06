import { logger } from '$helpers-client';
import { Project, ResolverFnWithParent } from '$types';
import { User } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const projects: ResolverFnWithParent<User, never, Promise<Project[]>> = async ({ id }, __, { prisma }) => {
  try {
    const projectsByRelation = await prisma.projectUserRelation.findMany({
      where: {
        userId: id,
      },
      select: {
        project: true,
      },
    });

    const projects = projectsByRelation.map(({ project }) => project);

    return projects as unknown as Project[];
  } catch (error) {
    logger.error('projects', error);
    throw new ApolloError(`An error occurred getting projects for user with id ${id}`);
  }
};
