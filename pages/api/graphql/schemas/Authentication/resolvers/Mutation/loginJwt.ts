import { jwtLogin, logger, validatePassword } from '$helpers-server';
import { MutationLoginJwtArgs, ResolverFn } from '$types';
import { ApolloError, AuthenticationError } from 'apollo-server-micro';

/**
 * Logs a user in using a JWT
 * @param _ The parent resolver
 * @param param1 The arguments passed to the resolver
 * @param param2 The context passed to the resolver
 * @returns The user's jwt
 */
export const loginJwt: ResolverFn<MutationLoginJwtArgs, Promise<string>> = async (_, { email, password }, { prisma }) => {
  if (!email || !password) {
    const error = new Error('Attempted to login but either email or password was not provided');
    logger.error('loginJwt', error);
    throw error;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const { password: dbPassword, ...rest } = user;

    const isPasswordCorrect = validatePassword(password, dbPassword);

    if (!isPasswordCorrect) {
      const error = new Error('Incorrect username or password');
      logger.error('loginJwt', error);
      throw new AuthenticationError(error as unknown as string);
    }

    const token = jwtLogin(rest);

    return token;
  } catch (error) {
    logger.error('loginJwt', error);
    throw new ApolloError('An error occurred while logging in');
  }
};
