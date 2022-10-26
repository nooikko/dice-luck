import { ResolverFn, MutationDeleteUserArgs, Mutation } from '$types';
import { ApolloError } from 'apollo-server-micro';
import { logger } from '$helpers-server';

/**
 * Resolver for the deleteUser mutation
 * @param _ The parent resolver
 * @param param1 The arguments passed to the resolver
 * @param param2 The context passed to the resolver
 * @returns A boolean indicating if the user was deleted
 */
export const deleteUser: ResolverFn<MutationDeleteUserArgs, Promise<Mutation['deleteUser']>> = async (_, { id }, { prisma }) => {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    return true;
  } catch (error) {
    logger.error('deleteUser', error);
    throw new ApolloError(`An error occurred deleting user with id ${id}`);
  }
};
