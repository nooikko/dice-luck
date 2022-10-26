import { logger } from '$helpers-server';
import { Mutation, MutationDeleteProjectArgs, ResolverFn } from '$types';
import { ApolloError } from 'apollo-server-micro';

export const deleteProject: ResolverFn<MutationDeleteProjectArgs, Promise<Mutation['deleteProject']>> = async (_, { id }, { prisma }) => {
  try {
    await prisma.project.delete({
      where: {
        id,
      },
    });

    return true;
  } catch (error) {
    logger.error('deleteProject', error);
    throw new ApolloError(`An error occurred deleting project with id ${id}`);
  }
};
