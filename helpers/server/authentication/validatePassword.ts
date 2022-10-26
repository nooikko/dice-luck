import bcrypt from 'bcryptjs';

/**
 * Validate password
 * @param password The password to validate
 * @param hash The hash to compare the password to
 * @returns Whether or not the password is valid
 */
export const validatePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
