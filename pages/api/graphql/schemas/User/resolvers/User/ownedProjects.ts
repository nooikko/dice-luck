import { QueryGetUserArgs, ResolverFnWithParent } from '$types';
import { Project, User } from '@prisma/client';
import { logger } from '$helpers-server';
import { ApolloError } from 'apollo-server-micro';

/**
 * Resolver for the ownedProjects query
 * @param param0 The parent resolver
 * @param __ The arguments passed to the resolver
 * @param param2 The context passed to the resolver
 * @returns The projects owned by the user
 */
export const ownedProjects: ResolverFnWithParent<User, QueryGetUserArgs, Promise<Project[]>> = async ({ id }, __, { prisma }) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        ownerId: id,
      },
    });

    return projects;
  } catch (error) {
    logger.error('ownedProjects', error);
    throw new ApolloError(`An error occurred getting projects owned by user with id ${id}`);
  }
};
