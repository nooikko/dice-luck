import { NextApiResponse, NextApiRequest } from 'next';

/**
 * A helper function to run middleware on a Next.js API route
 * @param req The request object
 * @param res The response object
 * @param fn The function to run
 * @returns The result of the function
 */
export const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};
