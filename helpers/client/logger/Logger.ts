/* eslint-disable no-console */
import dayjs from 'dayjs';
import { getErrorMessage } from './getErrorMessage';

type level = 0 | 1 | 2 | 3;

const validateLoggerLevel = (): level => {
  const settingLookup: { [key: string]: level } = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  };

  const { NEXT_PUBLIC_LOGGER_LEVEL } = process.env;

  if (!Object.keys(settingLookup).includes(NEXT_PUBLIC_LOGGER_LEVEL)) {
    console.error(`Failed to validate logger level. Got ${NEXT_PUBLIC_LOGGER_LEVEL}`);
    return settingLookup['error'];
  }

  return settingLookup[NEXT_PUBLIC_LOGGER_LEVEL];
};

class Logger {
  level: level;
  constructor() {
    this.level = validateLoggerLevel();
  }

  makePrefix(name: string) {
    return `[ ${dayjs().format('MMM DD YYYY - h:mm:ss A')} - ${name.toUpperCase()} ]`;
  }

  error(funcName: string, error: any) {
    const { NEXT_PUBLIC_LOG_STACK_TRACE } = process.env;
    const errorMessage = getErrorMessage(error);

    if (error?.stack && NEXT_PUBLIC_LOG_STACK_TRACE === 'true') {
      console.trace(error.stack);
    }

    console.error(this.makePrefix(funcName));
    console.error(errorMessage);
  }

  warn(funName: string, message: string, error: any): void;
  warn(funName: string, message: string): void;
  warn(...args: any[]) {
    if (this.level >= 2) {
      return;
    }

    const [funcName, message, error] = args;

    if (!error) {
      console.warn(this.makePrefix(funcName));
      console.warn(message);
      return;
    }

    const errorMessage = getErrorMessage(error);

    console.warn(this.makePrefix(funcName));
    console.warn(message);

    if (error?.stack) {
      console.trace(error.stack);
    }
    console.warn(errorMessage);
  }

  info(funcName: string, message: string) {
    if (this.level >= 3) {
      return;
    }

    console.info(this.makePrefix(funcName));
    console.info(message);
  }

  debug(funcName: string, message: string) {
    if (this.level < 3) {
      return;
    }

    console.debug(this.makePrefix(funcName));
    console.debug(message);
  }
}

export const logger = new Logger();
