import { TaskListStatus } from 'src/store/app/myTasks/taskListStatus'
import { TaskTabStatus } from 'src/store/app/myTasks/taskTabStatus'
import { TaskColumn } from 'src/store/entities/taskColumns'
import { TaskSectionResponse } from 'src/store/entities/taskSections'

export type MyTaskResponse = {
  taskSections: TaskSectionResponse[]
  taskColumns: TaskColumn[]
  taskStatus: TaskListStatus
  taskTabStatus: TaskTabStatus
}
