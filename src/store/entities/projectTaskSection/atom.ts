import { selectorFamily } from 'recoil'
import { projectTaskByTaskIdState } from 'src/store/entities/projectTask'
import { createState } from 'src/store/util'
import { ProjectTaskSection } from './type'

const key = (str: string) => `src/store/entities/projectsTaskSection/${str}`

export const DEFAULT_TITLE_NAME = 'Untitled Section'

export const initialState = (): ProjectTaskSection => ({
  id: '',
  name: '',
  projectId: '',
  isNew: false,
  createdAt: '',
  updatedAt: '',
})

export const {
  state: projectTaskSectionState,
  listState: projectTaskSectionsState,
} = createState({ key, initialState })

export const projectTaskSectionsByProjectIdState = selectorFamily<
  ProjectTaskSection[],
  string
>({
  key: key('projectTaskSectionsByProjectIdState'),
  get:
    (projectId) =>
    ({ get }) => {
      const projectsTaskSections = get(projectTaskSectionsState)
      return projectsTaskSections.filter((t) => t.projectId === projectId)
    },
})

export const projectTaskSectionByTaskIdState = selectorFamily<
  ProjectTaskSection,
  string
>({
  key: key('projectTaskSectionByTaskIdState'),
  get:
    (taskId) =>
    ({ get }) => {
      const projectTask = get(projectTaskByTaskIdState(taskId))
      const projectsTaskSections = get(projectTaskSectionsState)
      return (
        projectsTaskSections.find(
          (t) => t.id === projectTask.projectTaskSectionId,
        ) || initialState()
      )
    },
})
