import { TaskListStatus } from 'src/store/app/myTasks/taskListStatus'
import { TaskColumn } from 'src/store/entities/taskColumns'
import { TeammatesTaskSectionResponse } from 'src/store/entities/teammatesTaskSections'

export type MyTaskResponse = {
  taskSections: TeammatesTaskSectionResponse[]
  taskColumns: TaskColumn[]
  taskStatus: TaskListStatus
}
