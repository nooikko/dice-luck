import { logger } from '$helpers-client';
import { ResolverFn, QueryGetCharacterArgs } from '$types';
import { Character } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

/**
 * Resolver for the getCharacter query
 * @param _ The parent resolver
 * @param param1 The arguments passed to the resolver
 * @param param2 The context passed to the resolver
 * @returns The character
 */
export const getCharacter: ResolverFn<QueryGetCharacterArgs, Promise<Character>> = async (_, { id }, { prisma }) => {
  try {
    const character = await prisma.character.findUnique({
      where: {
        id,
      },
    });

    return character;
  } catch (error) {
    logger.error('getCharacter', error);
    throw new ApolloError(`An error occurred getting character with id ${id}`);
  }
};
