import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

const extractNames = (path: string) => {
  const [strippedPath] = path.split('.ts');
  const [, , , , , , folderName, fileName] = strippedPath.split('/');
  return {
    folderName,
    fileName,
  };
};

const getResolvers = async () => {
  const context = require.context(__dirname, true, /pages\/api\/graphql\/schemas\/.+\/resolvers\/.+\/.+.ts/);
  const filenames = context.keys();

  const models = filenames.reduce((acc, cur) => {
    const { folderName } = extractNames(cur);

    if (!Object.keys(acc).includes(folderName)) {
      acc[folderName] = {};
    } else {
      acc[folderName] = {
        ...acc[folderName],
      };
    }
    return acc;
  }, {} as any);

  for (const path of filenames) {
    const { folderName, fileName } = extractNames(path);
    const modules = await context(path);

    models[folderName] = {
      ...models[folderName],
      [fileName]: modules[fileName],
    };
  }

  return mergeResolvers(models);
};

const getTypeDefs = () => {
  const context: any = require.context(__dirname, true, /pages\/api\/graphql\/schemas\/.+\/schema.gql/);
  const typeDefs = context.keys().map(context);

  return mergeTypeDefs(typeDefs);
};

export const resolvers = getResolvers();
export const typeDefs = getTypeDefs();
