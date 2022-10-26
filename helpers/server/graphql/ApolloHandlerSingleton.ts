import { createApolloServer } from './createApolloServer';
import { NextApiResponse, NextApiRequest } from 'next';

// In order to prevent memory leaks associated with traditional Apollo-Server-Micro implementations
// A singleton is created and used to handle all incoming requests.
export class ApolloHandlerSingleton {
  static instance: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

  static async getInstance() {
    if (!ApolloHandlerSingleton.instance) {
      const server = await createApolloServer();
      ApolloHandlerSingleton.instance = server.createHandler({ path: '/api/graphql' });
    }
    return ApolloHandlerSingleton.instance;
  }
}
