import { TaskListStatus } from 'src/store/app/myTasks/taskListStatus'
import { TeammatesTaskColumnResponse } from 'src/store/entities/teammatesTaskColumns'
import { TeammatesTaskSectionResponse } from 'src/store/entities/teammatesTaskSections'

export type MyTaskResponse = {
  taskSections: TeammatesTaskSectionResponse[]
  taskColumns: TeammatesTaskColumnResponse[]
  taskStatus: TaskListStatus
}
