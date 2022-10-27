import { logger } from '$helpers-server';
import { CreateClassInput, ResolverFn } from '$types';
import { Class } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const createClass: ResolverFn<{ class: CreateClassInput }, Promise<Class>> = async (_, { class: classInput }, { prisma }) => {
  try {
    const newClass = await prisma.class.create({
      data: {
        ...classInput,
      },
    });

    return newClass;
  } catch (error) {
    logger.error('createClass', error);
    throw new ApolloError('An error occurred while creating the class');
  }
};
