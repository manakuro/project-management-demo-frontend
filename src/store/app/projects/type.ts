import { ProjectsTaskColumnResponse } from 'src/store/entities/projectsTaskColumns'
import { ProjectsTaskSectionResponse } from 'src/store/entities/projectsTaskSections'
import { TaskListStatus } from './taskListStatus'

export type ProjectsResponse = {
  taskSections: ProjectsTaskSectionResponse[]
  taskColumns: ProjectsTaskColumnResponse[]
  taskStatus: TaskListStatus
}
