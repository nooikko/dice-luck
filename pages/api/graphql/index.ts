import Cors from 'cors';
import { NextApiResponse, NextApiRequest } from 'next';
import { runMiddleware, ApolloHandlerSingleton } from '$helpers-server';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const cors = Cors({
  origin: '*', //TODO: Change this to the actual origin
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// TODO: Add a way to handle errors
// TODO: Add a way to handle GraphQL errors like 401s
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);

  if (req.method === 'OPTIONS') {
    res.status(200).send('ok');
    return;
  }

  const apolloHandler = await ApolloHandlerSingleton.getInstance();

  apolloHandler(req, res);
};

export default handler;
