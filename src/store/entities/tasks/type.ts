import { Attachment } from 'src/store/entities/attachments'
import { Feed } from 'src/store/entities/feeds'
import { Tag } from 'src/store/entities/tags'
import { Teammate } from 'src/store/entities/teammates'

export type Task = {
  assigneeId: string
  attachmentIds: string[]
  attachments: Attachment[]
  dueDate: string
  dueTime?: string
  feedIds: string[]
  feeds: Feed[]
  id: string
  isDeleted: boolean
  isDone: boolean
  isNew: boolean
  name: string
  projectIds: string[]
  projects: { id: string }[]
  tagIds: string[]
  tags: Tag[]
  taskParentId: string
  taskSectionId: string
  teammateIds: string[]
  teammates: Teammate[]
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
  projects: { id: string }[]
  subTasks: TaskResponse[]
  tags: Tag[]
  taskParentId: string
  taskSectionId: string
  teammates: Teammate[]
}
