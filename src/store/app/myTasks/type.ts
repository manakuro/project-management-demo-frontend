import { TaskListStatus } from 'src/store/app/myTasks/taskListStatus'
import { TaskColumn } from 'src/store/entities/taskColumns'
import { TaskSectionResponse } from 'src/store/entities/taskSections'

export type MyTaskResponse = {
  taskSections: TaskSectionResponse[]
  taskColumns: TaskColumn[]
  taskStatus: TaskListStatus
}
