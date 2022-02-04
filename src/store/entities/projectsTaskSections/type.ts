import type { ProjectTaskSectionResponse } from 'src/graphql/types/projectTaskSection'

export type { ProjectTaskSectionResponse } from 'src/graphql/types/projectTaskSection'

export type ProjectTaskSection = Omit<
  ProjectTaskSectionResponse,
  'projectTasks'
>
