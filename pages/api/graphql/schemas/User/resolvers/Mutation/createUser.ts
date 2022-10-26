import { hashPassword, logger } from '$helpers-server';
import { CreateUser, ResolverFn } from '$types';
import { User } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

/**
 * Resolver for the createUser mutation
 * @param _ The parent resolver
 * @param param1 The arguments passed to the resolver
 * @param param2 The context passed to the resolver
 * @returns The created user
 */
export const createUser: ResolverFn<{ user: CreateUser }, Promise<User>> = async (_, { user }, { prisma }) => {
  try {
    const { password, ...rest } = user;
    const newUser = await prisma.user.create({
      data: {
        ...rest,
        password: await hashPassword(password),
      },
    });

    return newUser;
  } catch (error) {
    logger.error('createUser', error);
    throw new ApolloError(`An error occurred creating user with email ${user.email}`);
  }
};
