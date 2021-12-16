export const config = {
  APP_ENV: process.env.APP_ENV || 'development',
  API_URL: process.env.API_URL || 'http://localhost:8080/query',
  API_SUBSCRIPTION_URL:
    process.env.API_SUBSCRIPTION_URL || 'ws://localhost:8080/subscription',
} as const
