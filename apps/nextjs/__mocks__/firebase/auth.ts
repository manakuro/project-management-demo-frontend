import { vi } from 'vitest';

export const getAuth = vi.fn(() => ({
  currentUser: {
    getIdToken: vi.fn(),
  },
}));
export const signInAnonymously = vi.fn();
export const onAuthStateChanged = vi.fn((_, nextOrObserver) => {
  nextOrObserver({});
  return vi.fn();
});
export const onIdTokenChanged = vi.fn((_, nextOrObserver) => {
  nextOrObserver({
    getIdToken: vi.fn(() => Promise.resolve('id')),
  });
  return vi.fn();
});
