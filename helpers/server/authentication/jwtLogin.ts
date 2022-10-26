import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-micro';
import { TokenData } from '$types';

export const jwtLogin = (data: TokenData) => {
  if (process.env.JWT_SECRET_KEY) {
    return jwt.sign(data, process.env.JWT_SECRET_KEY);
  }

  throw new ApolloError('Attempted to sign JWT but JWT_SECRET_KEY was not defined');
};
