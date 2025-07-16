import type { ArchivedTaskActivityResponse } from 'src/graphql/types/archivedTaskActivity'

export type { ArchivedTaskActivityResponse } from 'src/graphql/types/archivedTaskActivity'

export type ArchivedTaskActivity = Omit<
  ArchivedTaskActivityResponse,
  'archivedTaskActivityTasks' | 'activityType'
>
