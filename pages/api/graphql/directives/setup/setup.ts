import { Context } from '$types';
import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { logger } from '$helpers-server';
import { AuthenticationError } from 'apollo-server-micro';

/**
 * Replaces the resolver of any resolvers with '@authentication' to place it behind an authentication check
 * @param schema The current graphql schema
 * @param directiveName The name of the directive (ex, '@authentication' would use 'authentication)
 * @returns A schema with any resolvers with '@authentication' protected
 */
export const setup = (schema: GraphQLSchema, directiveName: string) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async (parent, args, context: Context, info) => {
          const systemConfig = await context.prisma.systemConfig.findFirst();

          if (!systemConfig.setupMode) {
            const errorMessage = 'Setup mode is not enabled';
            logger.error('setup', errorMessage);
            return new AuthenticationError(errorMessage);
          }

          return resolve(parent, args, context, info);
        };

        return fieldConfig;
      }
    },
  });
};
