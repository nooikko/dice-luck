import { logger } from '$helpers-server';
import { QueryProjectArgs, ResolverFn } from '$types';
import { Project } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

/**
 * Resolver for the getProject query
 * @param _ The parent resolver
 * @param param1 The arguments passed to the resolver
 * @param param2 The context passed to the resolver
 * @returns The project
 */
export const getProject: ResolverFn<QueryProjectArgs, Promise<Project>> = async (_, { id }, { prisma }) => {
  try {
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
