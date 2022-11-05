import { logger } from '$helpers-server';
import { QueryGetProjectArgs, ResolverFn } from '$types';
import { Project } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

/**
 * Resolver for the getProject query
 * @param _ The parent resolver
 * @param param1 The arguments passed to the resolver
 * @param param2 The context passed to the resolver
 * @returns The project
 */
export const getProject: ResolverFn<QueryGetProjectArgs, Promise<Project>> = async (_, { id }, { prisma, unpackedToken }) => {
  try {
    // TODO: Update permissions to allow for invited users to see the project
    const userProjects = await prisma.projectUserRelation.findMany({
      where: {
        userId: unpackedToken.id,
      },
    });

    const projectIds = userProjects.map(({ projectId }) => projectId);

    if (!projectIds.includes(id)) {
      throw new ApolloError('You are not authorized to view this project');
    }

    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    return project;
  } catch (error) {
    logger.error('getProject', error);
    throw new ApolloError(`An error occurred getting project with id ${id}`);
  }
};
