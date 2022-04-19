import { ArchivedTaskActivityTaskResponse } from 'src/graphql/types/archivedTaskActivityTask'

export type { ArchivedTaskActivityTaskResponse } from 'src/graphql/types/archivedTaskActivityTask'

export type ArchivedTaskActivityTask = Omit<
  ArchivedTaskActivityTaskResponse,
  'task'
>
