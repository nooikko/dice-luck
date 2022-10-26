import { logger, magicLogin } from '$helpers-server';
import { MutationLoginMagicArgs, ResolverFn } from '$types';

// TODO: Add a rate limiter to this resolver
export const loginMagic: ResolverFn<MutationLoginMagicArgs, Promise<boolean>> = async (_, { email }, { prisma }) => {
  if (!email) {
    const error = new Error('Attempted magic link login but no email was provided');
    logger.error('loginJwt', error);
    throw error;
  }

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        magicLink: {
          select: {
            createdAt: true,
            id: true,
          },
        },
      },
    });

    if (!foundUser) {
      const error = new Error(`Attempted to lookup user by email ${email} but found no user`);
      throw error;
    }

    if (foundUser?.magicLink) {
      try {
        await prisma.magicLink.delete({
          where: {
            id: foundUser.magicLink.id,
          },
        });
      } catch (error) {
        throw error;
      }
    }

    magicLogin(foundUser.id);

    // We always return true to make sure that someone cannot
    // enumerate user accounts by testing them
    // TODO: Talk to a security expert about this
    return true;
  } catch (error) {
    logger.error('loginMagic', error);
    return true;
  }
};
