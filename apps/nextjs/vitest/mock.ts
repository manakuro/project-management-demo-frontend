import { vi } from 'vitest';

// @see https://vitest.dev/guide/migration.html#auto-mocking-behaviour
vi.mock('firebase/app');
vi.mock('firebase/auth');
