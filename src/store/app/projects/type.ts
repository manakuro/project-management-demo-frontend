import { TaskColumn } from 'src/store/entities/taskColumns'
import { TaskSectionResponse } from 'src/store/entities/taskSections'
import { TaskListStatus } from './taskListStatus'

export type ProjectsResponse = {
  taskSections: TaskSectionResponse[]
  taskColumns: TaskColumn[]
  taskStatus: TaskListStatus
}
