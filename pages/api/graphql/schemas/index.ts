import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

const getResolvers = () => {
  const context = require.context(__dirname, true, /pages\/api\/graphql\/schemas\/.+\/resolvers\/.+\/.+.ts/);
  const filenames = context.keys();
  const resolverAggregate = filenames.reduce((acc, cur) => {
    const [, , , , , , resolverName] = cur.split('/');
    const modules = context(cur);
    const resolvers = Object.keys(modules).reduce((acc, cur) => {
      acc[cur] = modules[cur];

      return acc;
    }, {});

    if (!Object.keys(acc).includes(resolverName)) {
      acc[resolverName] = {
        ...resolvers,
      };
      return acc;
    }

    acc[resolverName] = {
      ...acc[resolverName],
      ...resolvers,
    };

    return acc;
  }, {} as any);

  return mergeResolvers(resolverAggregate);
};

const getTypeDefs = () => {
  const context: any = require.context(__dirname, true, /pages\/api\/graphql\/schemas\/.+\/schema.gql/);
  const typeDefs = context.keys().map(context);

  return mergeTypeDefs(typeDefs);
};

export const resolvers = getResolvers();
export const typeDefs = getTypeDefs();
