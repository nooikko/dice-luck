import { logger } from '$helpers-server';
import { MutationCreateProjectArgs, ResolverFn } from '$types';
import { Project } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const createProject: ResolverFn<MutationCreateProjectArgs, Promise<Project>> = async (_, { input }, { prisma, unpackedToken: { id } }) => {
  try {
    const newProject = await prisma.project.create({
      data: {
        ...input,
        owner: {
          connect: {
            id,
          },
        },
      },
    });

    await prisma.projectUserRelation.create({
      data: {
        assignedBy: {
          connect: {
            id,
          },
        },
        project: {
          connect: {
            id: newProject.id,
          },
        },
        user: {
          connect: {
            id,
          },
        },
      },
    });

    return newProject;
  } catch (error) {
    logger.error('createProject', error);
    throw new ApolloError(`An error occurred creating project with name ${input.name}`);
  }
};
