import { Attachment } from 'src/store/entities/attachments'
import { Feed } from 'src/store/entities/feeds'
import { Subtask } from 'src/store/entities/subtasks'
import { Tag } from 'src/store/entities/tags'
import { Teammate } from 'src/store/entities/teammates'

export type Task = {
  id: string
  projectIds: string[]
  projects: { id: string }[]
  name: string
  dueDate: string
  isDone: boolean
  dueTime?: string
  subTaskIds: string[]
  subTasks: Subtask[]
  assigneeId: string
  attachmentIds: string[]
  attachments: Attachment[]
  feedIds: string[]
  feeds: Feed[]
  teammateIds: string[]
  teammates: Teammate[]
  tagIds: string[]
  tags: Tag[]
}

export type TaskResponse = {
  id: string
  projects: { id: string }[]
  name: string
  dueDate: string
  isDone: boolean
  dueTime?: string
  subTasks: Subtask[]
  assigneeId: string
  attachments: Attachment[]
  feeds: Feed[]
  teammates: Teammate[]
  tags: Tag[]
}
