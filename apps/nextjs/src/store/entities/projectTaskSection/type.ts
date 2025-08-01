import type { ProjectTaskSectionResponse as Response } from '@/graphql/types/projectTaskSection';

export type {
  ProjectTaskSectionCreatedSubscriptionResponse,
  ProjectTaskSectionUpdatedSubscriptionResponse,
  ProjectTaskSectionDeletedSubscriptionResponse,
  ProjectTaskSectionDeletedAndKeepTasksSubscriptionResponse,
  ProjectTaskSectionDeletedAndDeleteTasksSubscriptionResponse,
  ProjectTaskSectionUndeletedAndKeepTasksSubscriptionResponse,
  ProjectTaskSectionUndeletedAndDeleteTasksSubscriptionResponse,
  DeleteProjectTaskSectionAndKeepTasksMutation,
  DeleteProjectTaskSectionAndDeleteTasksMutation,
  UpdateTaskSectionInput,
} from '@/graphql/types/projectTaskSection';

export type ProjectTaskSectionResponse = Response & {
  isNew?: boolean;
};

export type ProjectTaskSection = Omit<
  ProjectTaskSectionResponse,
  'projectTasks'
> & {
  isNew?: boolean;
};
