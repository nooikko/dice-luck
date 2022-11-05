import { logger } from '$helpers-server';
import { Mutation, MutationDeleteProjectArgs, ResolverFn } from '$types';
import { ApolloError } from 'apollo-server-micro';

export const deleteProject: ResolverFn<MutationDeleteProjectArgs, Promise<Mutation['deleteProject']>> = async (
  _,
  { id },
  { prisma, unpackedToken },
) => {
  try {
    const ownedProjects = await prisma.user.findUnique({
      where: {
        id: unpackedToken.id,
      },
      select: {
        ownedProjects: true,
      },
    });

    const ownedProjectIds = ownedProjects?.ownedProjects.map((project) => project.id) ?? [];

    if (!ownedProjectIds.includes(id)) {
      throw new ApolloError('You do not have permission to delete this project');
    }

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
