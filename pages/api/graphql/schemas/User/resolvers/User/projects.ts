import { ResolverFn } from '$types';
import { Project } from '@prisma/client';
import { logger } from '$helpers-server';
import { ApolloError } from 'apollo-server-micro';

// TODO: Refactor to more cleanly handle many-to-many relationships
/**
 * Resolver for the projects query
 * @param param0 The parent resolver
 * @param __ The arguments passed to the resolver
 * @param param2 The context passed to the resolver
 * @returns The projects the user is a member of
 */
export const projects: ResolverFn<null, Promise<Project[]>> = async ({ id }, __, { prisma }) => {
  try {
    const relationships = await prisma.projectUserRelation.findMany({
      where: {
        userId: id,
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            ownerId: true,
          },
        },
      },
    });

    const projects = relationships.map(({ project }) => project);

    return projects;
  } catch (error) {
    logger.error('projects', error);
    throw new ApolloError('An error occurred getting projects');
  }
};
