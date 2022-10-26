import { Context } from '$types';
import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { validateEmailFormat, logger } from '$helpers-server';
import { ValidationError } from 'apollo-server-micro';

/**
 * Validates the email format of any resolvers with '@validateEmail'
 * @param schema The current graphql schema
 * @param directiveName The name of the directive (ex, '@validateEmail' would use 'validateEmail)
 * @returns A schema with any resolvers with '@validateEmail' protected
 */
export const validateEmail = (schema: GraphQLSchema, directiveName: string) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (!directive) {
        return fieldConfig;
      }

      const { resolve = defaultFieldResolver } = fieldConfig;

      fieldConfig.resolve = async (parent, args, context: Context, info) => {
        if (!Object.keys(args).includes('email')) {
          logger.error('validateEmail', 'No email argument found');
          return new ValidationError('No email argument found');
        }

        if (!validateEmailFormat(args.email)) {
          const error = new Error(`Provided email '${args.email}' is not a valid email format`);
          logger.error('validateEmail', error);
          throw error;
        }

        const result = resolve(parent, args, context, info);

        return result;
      };
    },
  });
};
