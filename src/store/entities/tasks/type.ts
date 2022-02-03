import type { TaskResponse } from 'src/graphql/types/task'

export type { TaskResponse } from 'src/graphql/types/task'

export type Task = Omit<
  TaskResponse,
  | 'taskFiles'
  | 'taskTags'
  | 'taskCollaborators'
  | 'taskFeeds'
  | 'projectTasks'
  | 'subTasks'
>

// import { TaskFile } from 'src/store/entities/attachments'
// import { TaskFeed } from 'src/store/entities/feeds'
// import { ProjectTaskResponse } from 'src/store/entities/projectsTasks'
// import { TaskTag } from 'src/store/entities/tags'
// import { TaskCollaboratorResponse } from 'src/store/entities/tasksTeammates'
//
// export type Task = {
//   assigneeId: string
//   dueDate: string
//   dueTime?: string
//   id: string
//   isDeleted: boolean
//   isDone: boolean
//   doneAt: string
//   isNew: boolean
//   name: string
//   taskParentId: string
//   taskSectionId: string
//   priority: any
//   createdBy: string
//   createdAt: string
//   updatedAt: string
// }
//
// export type TaskResponse = {
//   assigneeId: string
//   attachments: TaskFile[]
//   dueDate: string
//   dueTime?: string
//   feeds: TaskFeed[]
//   id: string
//   isDeleted: boolean
//   isDone: boolean
//   doneAt: string
//   isNew: boolean
//   name: string
//   projects: ProjectTaskResponse[]
//   subTasks: TaskResponse[]
//   tags: TaskTag[]
//   taskParentId: string
//   taskSectionId: string
//   teammates: TaskCollaboratorResponse[] // collaborators
//   priority: any
//   createdBy: string
//   createdAt: string
//   updatedAt: string
// }
