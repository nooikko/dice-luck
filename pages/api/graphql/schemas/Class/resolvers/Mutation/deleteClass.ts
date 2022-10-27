import { logger } from '$helpers-server';
import { Mutation, MutationDeleteClassArgs, ResolverFn } from '$types';
import { ApolloError } from 'apollo-server-micro';

export const deleteClass: ResolverFn<MutationDeleteClassArgs, Promise<Mutation['deleteClass']>> = async (_, { id }, { prisma }) => {
  try {
    await prisma.class.delete({
      where: {
        id,
      },
    });

    return true;
  } catch (error) {
    logger.error('deleteClass', error);
    throw new ApolloError(`An error occurred deleting class with id ${id}`);
  }
};
