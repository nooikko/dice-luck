import dayjs from 'dayjs';
import { info, event, error as nextError, trace, warn } from 'next/dist/build/output/log';
import { getErrorMessage } from './getErrorMessage';

type level = 0 | 1 | 2 | 3;

const validateLoggerLevel = (): level => {
  const settingLookup: { [key: string]: level } = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  };

  const { SERVER_LOGGING_LEVEL } = process.env;

  if (!Object.keys(settingLookup).includes(SERVER_LOGGING_LEVEL)) {
    nextError(`Failed to validate logger level. Got ${SERVER_LOGGING_LEVEL}`);
    return settingLookup['error'];
  }

  return settingLookup[SERVER_LOGGING_LEVEL];
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
    const { SERVER_LOG_STACK_TRACE } = process.env;
    const errorMessage = getErrorMessage(error);

    if (error?.stack && SERVER_LOG_STACK_TRACE === 'true') {
      trace(error.stack);
    }

    nextError(this.makePrefix(funcName));
    nextError(errorMessage);
  }

  warn(funName: string, message: string, error: any): void;
  warn(funName: string, message: string): void;
  warn(...args: any[]) {
    if (this.level >= 2) {
      return;
    }

    const [funcName, message, error] = args;

    if (!error) {
      warn(this.makePrefix(funcName));
      warn(message);
      return;
    }

    const errorMessage = getErrorMessage(error);

    warn(this.makePrefix(funcName));
    warn(message);

    if (error?.stack) {
      trace(error.stack);
    }
    warn(errorMessage);
  }

  info(funcName: string, message: string) {
    if (this.level >= 3) {
      return;
    }

    event(this.makePrefix(funcName));
    event(message);
  }

  debug(funcName: string, message: string) {
    if (this.level < 3) {
      return;
    }

    info(this.makePrefix(funcName));
    info(message);
  }
}

export const logger = new Logger();
