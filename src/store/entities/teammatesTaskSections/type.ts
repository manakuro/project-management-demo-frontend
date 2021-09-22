import { TaskSectionResponse } from 'src/store/entities/taskSections'

export type TeammatesTaskSectionResponse = {
  id: string
  teammateId: string
  taskSectionId: string
  taskSection: TaskSectionResponse
  createdAt: string
  updatedAt: string
}

export type TeammatesTaskSection = {
  id: string
  teammateId: string
  taskSectionId: string
  createdAt: string
  updatedAt: string
}
