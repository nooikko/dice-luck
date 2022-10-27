import { logger } from '$helpers-server';
import { CreateProject, ResolverFn } from '$types';
import { Project } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const createProject: ResolverFn<{ project: CreateProject }, Promise<Project>> = async (_, { project }, { prisma, unpackedToken }) => {
  try {
    const newProject = await prisma.project.create({
      data: {
        name: project.name,
        ownerId: unpackedToken.id,
        projectUserRelation: {
          // TODO: Maybe switch this to an invite system
          create: project?.userIds?.map((userId) => {
            return {
              user: {
                connect: {
                  id: userId,
                },
              },
              assignById: unpackedToken.id,
            };
          }),
        },
      },
    });

    return newProject;
  } catch (error) {
    logger.error('createProject', error);
    throw new ApolloError('An error occurred while creating the project');
  }
};
