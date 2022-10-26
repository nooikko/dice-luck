import { isMagicValid, logger, magicResend } from '$helpers-server';
import { MutationLoginMagicArgs, ResolverFn } from '$types';
import { ApolloError } from 'apollo-server-micro';

export const resendMagic: ResolverFn<MutationLoginMagicArgs, Promise<boolean>> = async (_, { email }, { prisma }) => {
  if (!email) {
    const error = new Error('Attempted magic link login but no email was provided');
    logger.error('loginJwt', error);
    throw error;
  }

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        magicLink: {
          select: {
            createdAt: true,
            id: true,
            slug: true,
          },
        },
      },
    });

    if (!foundUser) {
      const error = new Error(`Attempted to lookup user by email ${email} but found no user`);
      throw error;
    }

    if (!foundUser?.magicLink) {
      const error = new Error(`Attempted to resend magic link for ${email} but there is no current magic link`);
      throw error;
    }

    if (!isMagicValid(foundUser?.magicLink?.createdAt)) {
      const error = new Error(`Attempted to resend magic link for ${email} but magic link is expired`);
      throw error;
    }

    return magicResend(foundUser.id);
  } catch (error) {
    logger.error('resendMagic', error);
    throw new ApolloError('An error occurred while logging in');
  }
};
