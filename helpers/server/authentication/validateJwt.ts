import { TokenData } from '$types';
import jwt from 'jsonwebtoken';
import { logger } from '../logger';

/**
 * Validates the JWT token
 * @param token The token to validate
 * @returns The decoded token data
 */
export const validateJwt = (token: string) => {
  try {
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error('Attempted to validate JWT but no SECRET_KEY is set');
    }

    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);

    return data as TokenData;
  } catch (error) {
    logger.error('validateJwt', error);

    // TODO: Handle fallout of finding that a token is expired
    if (error.message.includes('jwt expired')) {
      return {
        validated: false,
      } as TokenData;
    }

    throw error;
  }
};
