type ErrorWithMessage = {
  message: string;
};

/**
 * Returns the error message from an error object.
 * @param error The error to get the message from
 * @returns The error message
 */
const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return typeof error === 'object' && error !== null && 'message' in error && typeof (error as Record<string, unknown>).message === 'string';
};

/**
 * Returns the error message from an error object.
 * @param maybeError The error to get the message from
 * @returns The error message
 */
const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(maybeError)) {
    return maybeError;
  }

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
};

/**
 * Returns the error message from an error object.
 * @param error The error to get the message from
 * @returns The error message
 */
export const getErrorMessage = (error: unknown) => {
  return toErrorWithMessage(error).message;
};
