import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import {
  taskSectionSelector,
  TaskSection,
} from 'src/store/entities/taskSections'
import { ProjectsTaskSection } from './type'

const key = (str: string) => `src/store/entities/projectsTaskSections/${str}`

export const DEFAULT_TITLE_NAME = 'Untitled Section'

export const projectsTaskSectionsState = atom<ProjectsTaskSection[]>({
  key: key('projectsTaskSectionsState'),
  default: [],
})

export const defaultProjectsTaskSectionState = (): ProjectsTaskSection => ({
  id: '',
  taskSectionId: '',
  projectId: '',
  createdAt: '',
  updatedAt: '',
})

const projectsTaskSectionState = atomFamily<ProjectsTaskSection, string>({
  key: key('projectsTaskSectionState'),
  default: defaultProjectsTaskSectionState(),
})

export const taskSectionIdsByProjectIdSelector = selectorFamily<
  string[],
  string
>({
  key: key('taskSectionIdsByProjectIdSelector'),
  get:
    (projectId) =>
    ({ get }) => {
      const projectsTaskSections = get(projectsTaskSectionsState)
      return projectsTaskSections
        .filter((t) => t.projectId === projectId)
        .map((p) => p.taskSectionId)
    },
})

export const taskSectionsByProjectIdSelector = selectorFamily<
  TaskSection[],
  string
>({
  key: key('taskSectionsByProjectIdSelector'),
  get:
    (projectId) =>
    ({ get }) => {
      const projectsTaskSections = get(projectsTaskSectionsState)
      return projectsTaskSections
        .filter((t) => t.projectId === projectId)
        .map((p) => get(taskSectionSelector(p.taskSectionId)))
    },
})

export const projectsTaskSectionSelector = selectorFamily<
  ProjectsTaskSection,
  string
>({
  key: key('projectsTaskSectionSelector'),
  get:
    (projectsTaskSectionId) =>
    ({ get }) =>
      get(projectsTaskSectionState(projectsTaskSectionId)),
  set:
    (projectsTaskSectionId) =>
    ({ set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(projectsTaskSectionState(projectsTaskSectionId))
        return
      }

      set(projectsTaskSectionState(projectsTaskSectionId), newVal)
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
