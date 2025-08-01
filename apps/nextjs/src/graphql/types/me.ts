import type { MeQuery } from '@/graphql/types';

export type MeResponse = NonNullable<MeQuery['me']>;
