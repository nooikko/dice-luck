import { logger } from '$helpers-client';
import { ResolverFn } from '$types';
import { Character } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

/**
 * Resolver for the getCharacters query
 * @param _ The parent resolver
 * @param __ The arguments passed to the resolver
 * @param param2 The context passed to the resolver
 * @returns The characters
 */
export const getCharacters: ResolverFn<never, Promise<Character[]>> = async (_, __, { prisma, unpackedToken: { id } }) => {
  try {
    const characters = await prisma.character.findMany({
      where: {
        userId: id,
      },
    });

    return characters;
  } catch (error) {
    logger.error('getCharacters', error);
    throw new ApolloError(`An error occurred getting characters for user with id ${id}`);
  }
};
