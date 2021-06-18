import { Attachment } from 'src/store/entities/attachments'
import { Feed } from 'src/store/entities/feeds'
import { ProjectTaskResponse } from 'src/store/entities/projectTasks'
import { Tag } from 'src/store/entities/tags'
import { TaskTeammateResponse } from 'src/store/entities/taskTeammates'

export type Task = {
  assigneeId: string
  dueDate: string
  dueTime?: string
  feeds: Feed[]
  id: string
  isDeleted: boolean
  isDone: boolean
  isNew: boolean
  name: string
  projects: ProjectTaskResponse[]
  taskParentId: string
  taskSectionId: string
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
  isNew: boolean
  name: string
  projects: ProjectTaskResponse[]
  subTasks: TaskResponse[]
  tags: Tag[]
  taskParentId: string
  taskSectionId: string
  teammates: TaskTeammateResponse[]
}
