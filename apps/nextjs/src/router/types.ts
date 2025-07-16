import type { NextRouter } from 'next/router';

export type Options = Parameters<NextRouter['push']>[2];
