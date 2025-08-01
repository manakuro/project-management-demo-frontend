import type { MentionQuery } from '@/graphql/types';

export type MentionResponse = NonNullable<
  NonNullable<MentionQuery['mentions']>[number]
>;
