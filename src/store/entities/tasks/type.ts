import { TaskFile } from 'src/store/entities/attachments'
import { TaskFeed } from 'src/store/entities/feeds'
import { ProjectsTaskResponse } from 'src/store/entities/projectsTasks'
import { TaskTag } from 'src/store/entities/tags'
import { TasksPriorityTypes } from 'src/store/entities/tasksPriorities'
import { TasksTeammateResponse } from 'src/store/entities/tasksTeammates'

export type Task = {
  assigneeId: string
  dueDate: string
  dueTime?: string
  id: string
  isDeleted: boolean
  isDone: boolean
  doneAt: string
  isNew: boolean
  name: string
  taskParentId: string
  taskSectionId: string
  priority: TasksPriorityTypes
  createdBy: string
  createdAt: string
  updatedAt: string
}

export type TaskResponse = {
  assigneeId: string
  attachments: TaskFile[]
  dueDate: string
  dueTime?: string
  feeds: TaskFeed[]
  id: string
  isDeleted: boolean
  isDone: boolean
  doneAt: string
  isNew: boolean
  name: string
  projects: ProjectsTaskResponse[]
  subTasks: TaskResponse[]
  tags: TaskTag[]
  taskParentId: string
  taskSectionId: string
  teammates: TasksTeammateResponse[] // collaborators
  priority: TasksPriorityTypes
  createdBy: string
  createdAt: string
  updatedAt: string
}
