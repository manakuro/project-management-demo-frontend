import { Attachment } from 'src/store/entities/attachments'
import { Feed } from 'src/store/entities/feeds'
import { ProjectsTaskResponse } from 'src/store/entities/projectsTasks'
import { Tag } from 'src/store/entities/tags'
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
  createdBy: string
}

export type TaskResponse = {
  assigneeId: string
  attachments: Attachment[]
  dueDate: string
  dueTime?: string
  feeds: Feed[]
  id: string
  isDeleted: boolean
  isDone: boolean
  doneAt: string
  isNew: boolean
  name: string
  projects: ProjectsTaskResponse[]
  subTasks: TaskResponse[]
  tags: Tag[]
  taskParentId: string
  taskSectionId: string
  teammates: TasksTeammateResponse[] // collaborators
  createdBy: string
}
