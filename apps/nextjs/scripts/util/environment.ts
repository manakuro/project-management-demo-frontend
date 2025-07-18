export const isDev = () => process.env.NODE_ENV !== 'production'
export const isProduction = () => process.env.APP_ENV === 'production'
