import { ApolloServer } from 'apollo-server-micro';
import cookie from 'cookie';
import { resolvers, typeDefs } from '$graphql-schema';
import { prisma } from '$prisma';
import { validateJwt } from '$helpers-server';
import { Context } from '$types';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyDirectives, directiveTypeDefs } from '$graphql-directives';

export const createApolloServer = async () => {
  const apolloServer = new ApolloServer({
    schema: await applyDirectives(
      makeExecutableSchema({
        resolvers,
        typeDefs: [typeDefs, directiveTypeDefs],
      }),
    ),
    context: async ({ req }): Promise<Context> => {
      const output: Context = {
        prisma,
        cookies: {},
        unpackedToken: {
          email: '',
          id: '',
          validated: false, // If the JWT is valid, this will be true
          verified: false, // If the user has verified their email
        },
      };

      if (!req?.headers?.cookie) {
        return output;
      }

      output.cookies = cookie.parse(req?.headers?.cookie);

      if (output.cookies?.user) {
        output.unpackedToken = validateJwt(output.cookies.user);
      }

      return output;
    },
  });

  await apolloServer.start();

  return apolloServer;
};
