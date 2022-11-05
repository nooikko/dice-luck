import { logger } from '$helpers-server';
import { MutationCreateArchetypeLevelArgs, ResolverFn } from '$types';
import { ArchetypeLevel, Archetype } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const createArchetypeLevel: ResolverFn<MutationCreateArchetypeLevelArgs, Promise<ArchetypeLevel>> = async (
  _,
  { input },
  { prisma, unpackedToken: { id } },
) => {
  const arch = input.archetype as Archetype;

  try {
    const newArchetypeLevel = await prisma.archetypeLevel.create({
      data: {
        archetype: arch,
        character: {
          connect: {
            id: input.characterId,
          },
        },
        user: {
          connect: {
            id,
          },
        },
        level: input.level,
      },
    });

    return newArchetypeLevel;
  } catch (error) {
    logger.error('createArchetypeLevel', error);
    throw new ApolloError('Error creating archetype level');
  }
};
