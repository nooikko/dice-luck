import { logger } from '$helpers-server';
import { ResolverFn } from '$types';
import { User } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

// Get all users from the database with the prisma client in a try/catch block
export const getUsers: ResolverFn<null, Promise<User[]>> = async (_, __, { prisma }) => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    logger.error('getUsers', error);
    throw new ApolloError('An error occurred getting users');
  }
};
