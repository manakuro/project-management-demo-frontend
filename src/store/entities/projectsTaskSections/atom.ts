import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { taskSectionState, TaskSection } from 'src/store/entities/taskSections'
import { ProjectsTaskSection } from './type'

const key = (str: string) => `src/store/entities/projectsTaskSections/${str}`

export const DEFAULT_TITLE_NAME = 'Untitled Section'

export const projectsTaskSectionsState = atom<ProjectsTaskSection[]>({
  key: key('projectsTaskSectionsState'),
  default: [],
})

export const initialProjectsTaskSectionState = (): ProjectsTaskSection => ({
  id: '',
  taskSectionId: '',
  projectId: '',
  createdAt: '',
  updatedAt: '',
})

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

const state = atomFamily<ProjectsTaskSection, string>({
  key: key('state'),
  default: initialProjectsTaskSectionState(),
})

export const projectsTaskSectionState = selectorFamily<
  ProjectsTaskSection,
  string
>({
  key: key('projectsTaskSectionState'),
  get:
    (projectsTaskSectionId) =>
    ({ get }) =>
      get(state(projectsTaskSectionId)),
  set:
    (projectsTaskSectionId) =>
    ({ set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(projectsTaskSectionId))
        return
      }

      set(state(projectsTaskSectionId), newVal)
      set(projectsTaskSectionsState, (prev) =>
        uniqBy([...prev, newVal], 'id').map((p) => {
          if (p.id === newVal.id) {
            return {
              ...p,
              ...newVal,
            }
          }
          return p
        }),
      )
    },
})
