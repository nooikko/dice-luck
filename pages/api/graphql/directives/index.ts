import { GraphQLSchema } from 'graphql';
import { mergeTypeDefs } from '@graphql-tools/merge';

/**
 * Utilizes webpack require context to automatically resolve files matching the provided regex
 * https://webpack.js.org/guides/dependency-management/#requirecontext
 * @returns A list of compiled typeDefs associated with directives
 */
const getDirectiveSchemas = () => {
  const context: any = require.context(__dirname, true, /pages\/api\/graphql\/directives\/.+\/schema.gql/);
  const typeDefs = context.keys().map(context);

  return mergeTypeDefs(typeDefs);
};

/**
 * Utilizes webpack require context to automatically resolve files matching the provided regex
 * https://webpack.js.org/guides/dependency-management/#requirecontext
 * @returns A list of compiled directive functions to append to the schema
 */
// TODO: Make this more dynamic
const loadDirectives = async () => {
  const context = require.context(__dirname, true, /pages\/api\/graphql\/directives\/.+\/(authentication|uppercase|validateEmail|setup).ts/);
  const filenames = context.keys();
  const directives = await Promise.all(
    filenames.map(async (name) => {
      const resolved = await context(name);
      const keys = Object.keys(resolved);

      return {
        func: resolved[keys[0]],
        name: keys[0],
      };
    }),
  );

  return directives;
};

/**
 * Takes in the current schema and rebuilds all resolvers that utilize directives
 * @param schema The current GraphQL schema
 * @returns The current GraphQL schema with directives applied
 */
export const applyDirectives = async (schema: GraphQLSchema) => {
  const directives = await loadDirectives();
  let output = schema;

  for (const { func, name } of directives) {
    output = func(output, name);
  }

  return output;
};

export const directiveTypeDefs = getDirectiveSchemas();
