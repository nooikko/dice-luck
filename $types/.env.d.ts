declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // LOGGER
      SERVER_LOG_STACK_TRACE: 'true' | 'false';
      NEXT_PUBLIC_LOG_STACK_TRACE: 'true' | 'false';
      SERVER_LOGGING_LEVEL: 'error' | 'warn' | 'info' | 'debug';
      NEXT_PUBLIC_LOGGER_LEVEL: 'error' | 'warn' | 'info' | 'debug';
      // DATABASE
      DATABASE_URL: string;
      // TWILIO
      TWILIO_ACCOUNT_SID: string;
      TWILIO_AUTH_TOKEN: string;
      TWILIO_FROM_NUMBER: string;
      // POSTMARK
      POSTMARK_FROM_EMAIL: string;
      POSTMARK_API_TOKEN: string;
      // JWT
      JWT_SECRET_KEY: string;
      AUTH_TIMEOUT_MINUTES: number;
      // PUBLIC
      NEXT_PUBLIC_ANALYTICS_ID: string;

    }
  }
}

export {};
