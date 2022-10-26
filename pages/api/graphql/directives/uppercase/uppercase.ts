import { Context } from '$types';
import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';

/**
 * Replaces the resolver of any resolvers with '@uppercase' to return uppercased results
 * @param schema The current graphql schema
 * @param directiveName The name of the directive (ex, '@uppercase' would use 'uppercase)
 * @returns A schema with any resolvers with '@uppercase' to return uppercased results
 */
export const uppercase = (schema: GraphQLSchema, directiveName: string) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async (parent, args, context: Context, info) => {
          const result = resolve(parent, args, context, info);

          if (typeof result === 'string') {
            return result.toUpperCase();
          }

          return result;
        };

        return fieldConfig;
      }
    },
  });
};
