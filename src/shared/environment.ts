export const isClient = (): boolean => typeof window !== 'undefined';
export const isServer = (): boolean => typeof window === 'undefined';
