import { isMagicValid, jwtLogin, logger } from '$helpers-server';
import { MutationValidateMagicArgs, ResolverFn } from '$types';
import { ApolloError } from 'apollo-server-micro';

export const validateMagic: ResolverFn<MutationValidateMagicArgs, Promise<string>> = async (_, { slug }, { prisma }) => {
  if (!slug) {
    const error = new Error('Attempted to validate magic link but no slug was provided');
    logger.error('validateMagic', error);
    throw error;
  }

  try {
    const magicLink = await prisma.magicLink.findUnique({
      where: {
        slug,
      },
      include: {
        user: true,
      },
    });

    if (!isMagicValid(magicLink?.createdAt)) {
      const error = new Error(`Attempted to login with magic link for ${magicLink.userId} but magic link is expired`);
      throw error;
    }

    const { password, ...rest } = magicLink?.user;

    const token = jwtLogin(rest);

    return token;
  } catch (error) {
    logger.error('loginJwt', error);
    throw new ApolloError('An error occurred while logging in');
  }
};
