import { Context } from '$types';
import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { AuthenticationError } from 'apollo-server-core';
import { logger } from '$helpers-server';

/**
 * Replaces the resolver of any resolvers with '@authentication' to place it behind an authentication check
 * @param schema The current graphql schema
 * @param directiveName The name of the directive (ex, '@authentication' would use 'authentication)
 * @returns A schema with any resolvers with '@authentication' protected
 */
export const authentication = (schema: GraphQLSchema, directiveName: string) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async (parent, args, context: Context, info) => {
          if (!context?.unpackedToken?.validated) {
            logger.error('authentication', 'User is not authenticated');
            return new AuthenticationError(`You must be logged in to access ${info.parentType.name}.${fieldConfig.astNode?.name.value}`);
          }

          return resolve(parent, args, context, info);
        };

        return fieldConfig;
      }
    },
  });
};
