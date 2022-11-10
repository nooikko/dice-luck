import { logger } from '$helpers-server';
import { MutationCreateRollArgs, ResolverFn } from '$types';
import { Roll } from '@prisma/client';
import { ApolloError } from 'apollo-server-micro';

export const createRoll: ResolverFn<MutationCreateRollArgs, Promise<Roll>> = async (_, { input }, { prisma, unpackedToken }) => {
  try {
    const { characterId, userId, parentId, ...rest } = input;

    const newRoll = await prisma.roll.create({
      data: {
        ...rest,
        parent: {
          connectOrCreate: {
            where: {
              id: parentId,
            },
            create: {
              id: parentId,
              type: rest.type,
              sides: rest.sides,
              user: {
                connect: {
                  id: userId,
                },
              },
              character: {
                connect: {
                  id: characterId,
                },
              },
            },
          },
        },
        user: {
          connect: {
            id: userId ?? unpackedToken.id,
          },
        },
        character: {
          connect: {
            id: characterId,
          },
        },
      },
    });

    return newRoll;
  } catch (error) {
    logger.error('createRoll', error);
    throw new ApolloError('An error occurred creating roll with name');
  }
};
