import { TaskSectionResponse } from 'src/store/entities/taskSections'

export type ProjectsTaskSectionResponse = {
  id: string
  projectId: string
  taskSectionId: string
  taskSection: TaskSectionResponse
  createdAt: string
  updatedAt: string
}

export type ProjectsTaskSection = {
  id: string
  projectId: string
  taskSectionId: string
  createdAt: string
  updatedAt: string
}
