// Regex is from https://stackoverflow.com/questions/42982005/email-address-regular-expression-rfc-5322-passed-in-to-match-does-not-work
// eslint-disable-next-line prettier/prettier
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Validates that the email is in the correct format
 * @param email The email to validate
 * @returns Whether or not the email is valid
 */
export const validateEmailFormat = (email: string): boolean => {
  return emailRegex.test(email);
};
