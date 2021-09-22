import { ProjectsTaskSectionResponse } from 'src/store/entities/projectsTaskSections'
import { TaskColumn } from 'src/store/entities/taskColumns'
import { TaskListStatus } from './taskListStatus'

export type ProjectsResponse = {
  taskSections: ProjectsTaskSectionResponse[]
  taskColumns: TaskColumn[]
  taskStatus: TaskListStatus
}
