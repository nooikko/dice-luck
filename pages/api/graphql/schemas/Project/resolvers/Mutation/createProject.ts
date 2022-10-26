import { logger } from '$helpers-server';
import { CreateProject, ResolverFn } from '$types';
import { Project } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const createProject: ResolverFn<{ project: CreateProject }, Promise<Project>> = async (_, { project }, { prisma }) => {
  try {
    // TODO: This needs the ownerId field, we need to get it from context
    // TODO: Create helper to obfusacte user exists checking
    const newProject = await prisma.project.create({
      data: {
        name: project.name,
        ownerId: 'example',
        projectUserRelation: {
          create: project?.userIds?.map((userId) => {
            return {
              user: {
                connect: {
                  id: userId,
                },
              },
              assignedAt: new Date(),
              assignById: 'testcase',
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
