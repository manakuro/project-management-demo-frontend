import type { TeammateTaskSectionResponse } from 'src/graphql/types/teammateTaskSection'

export type { TeammateTaskSectionResponse } from 'src/graphql/types/teammateTaskSection'

export type TeammateTaskSection = Omit<
  TeammateTaskSectionResponse,
  'teammateTasks'
>
