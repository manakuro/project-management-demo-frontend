import { selectorFamily } from 'recoil'
import { taskSectionState, TaskSection } from 'src/store/entities/taskSections'
import { createState } from 'src/store/util'
import { ProjectsTaskSection } from './type'

const key = (str: string) => `src/store/entities/projectsTaskSections/${str}`

export const DEFAULT_TITLE_NAME = 'Untitled Section'

export const initialState = (): ProjectsTaskSection => ({
  id: '',
  taskSectionId: '',
  projectId: '',
  createdAt: '',
  updatedAt: '',
})

export const {
  state: projectsTaskSectionState,
  listState: projectsTaskSectionsState,
} = createState({ key, initialState })

export const taskSectionIdsByProjectIdState = selectorFamily<string[], string>({
  key: key('taskSectionIdsByProjectIdState'),
  get:
    (projectId) =>
    ({ get }) => {
      const projectsTaskSections = get(projectsTaskSectionsState)
      return projectsTaskSections
        .filter((t) => t.projectId === projectId)
        .map((p) => p.taskSectionId)
    },
})

export const taskSectionsByProjectIdState = selectorFamily<
  TaskSection[],
  string
>({
  key: key('taskSectionsByProjectIdState'),
  get:
    (projectId) =>
    ({ get }) => {
      const projectsTaskSections = get(projectsTaskSectionsState)
      return projectsTaskSections
        .filter((t) => t.projectId === projectId)
        .map((p) => get(taskSectionState(p.taskSectionId)))
    },
})
