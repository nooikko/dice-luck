import { logger } from '$helpers-server';
import { MutationCreateCharacterArgs, ResolverFn } from '$types';
import { Character } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const createCharacter: ResolverFn<MutationCreateCharacterArgs, Promise<Character>> = async (
  _,
  { input },
  { prisma, unpackedToken: { id } },
) => {
  try {
    const { projectId, ...rest } = input;
    const newCharacter = await prisma.character.create({
      data: {
        ...rest,
        user: {
          connect: {
            id,
          },
        },
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });

    return newCharacter;
  } catch (error) {
    logger.error('createCharacter', error);
    throw new ApolloError(`An error occurred creating character with name ${input.name}`);
  }
};
