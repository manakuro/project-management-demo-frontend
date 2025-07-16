import type { MeQuery } from 'src/graphql/types';

export type MeResponse = NonNullable<MeQuery['me']>;
