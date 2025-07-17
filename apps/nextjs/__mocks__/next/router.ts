import { vi } from 'vitest';

export const useRouter = () => ({
  basePath: '/',
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  push: vi.fn(() => Promise.resolve(true)),
  replace: vi.fn(() => Promise.resolve(true)),
  reload: vi.fn(() => Promise.resolve(true)),
  prefetch: vi.fn(() => Promise.resolve()),
  back: vi.fn(() => Promise.resolve(true)),
  beforePopState: vi.fn(() => Promise.resolve(true)),
  isFallback: false,
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
});
