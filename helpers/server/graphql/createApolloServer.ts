// @ts-nocheck
import { applyDirectives, directiveTypeDefs } from '$graphql-directives';
import { resolvers, typeDefs } from '$graphql-schema';
import { validateJwt } from '$helpers-server';
import { prisma } from '$prisma';
import { Context } from '$types';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-micro';

export const createApolloServer = async () => {
  const apolloServer = new ApolloServer({
    schema: await applyDirectives(
      makeExecutableSchema({
        resolvers: await resolvers,
        typeDefs: [typeDefs, directiveTypeDefs],
      }),
    ),
    context: async ({ req }): Promise<Context> => {
      const output: Context = {
        prisma,
        unpackedToken: {
          email: '',
          id: '',
          validated: false, // If the JWT is valid, this will be true
          verified: false, // If the user has verified their email
        },
      };

      if (Object.keys(req.headers).includes('authorization')) {
        const [, token] = req.headers.authorization.split(' ');

        const unpackedToken = validateJwt(token);

        if (unpackedToken) {
          output.unpackedToken = unpackedToken;
        }
      }

      return output;
    },
  });

  await apolloServer.start();

  return apolloServer;
};
