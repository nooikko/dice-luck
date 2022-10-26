import bcrypt from 'bcryptjs';
import { User } from '@prisma/client';

export const hashPassword = async (password: User['password']) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  } catch (e) {
    throw e;
  }
};
