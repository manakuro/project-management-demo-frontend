import { MentionQuery } from 'src/graphql/types'

export type MentionResponse = NonNullable<
  NonNullable<MentionQuery['mentions']>[number]
>
