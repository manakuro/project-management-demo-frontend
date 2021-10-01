import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { taskColumnByTypeState } from 'src/store/entities/taskColumns'
import { TaskColumnType } from 'src/store/entities/taskColumns/types'
import { ProjectsTaskColumn } from './type'

const key = (str: string) => `src/store/entities/projectsTaskColumns/${str}`

export const projectsTaskColumnIdsState = atom<string[]>({
  key: key('projectsTaskColumnIdsState'),
  default: [],
})

export const projectsTaskColumnsState = atom<ProjectsTaskColumn[]>({
  key: key('projectsTaskColumnsState'),
  default: [],
})

export const projectsTaskColumnsByProjectIdState = selectorFamily<
  ProjectsTaskColumn[],
  string
>({
  key: key('projectsTaskColumnsByProjectIdState'),
  get:
    (projectId: string) =>
    ({ get }) => {
      const taskColumns = get(projectsTaskColumnsState)
      return taskColumns.filter((t) => t.projectId === projectId)
    },
})

export const projectsTaskColumnByTypeState = selectorFamily<
  ProjectsTaskColumn,
  { projectId: string; type: TaskColumnType }
>({
  key: key('projectsTaskColumnByTypeState'),
  get:
    ({ projectId, type }) =>
    ({ get }) => {
      const taskColumn = get(taskColumnByTypeState(type))
      const taskColumns = get(projectsTaskColumnsState)
      return (
        taskColumns.find(
          (t) => t.projectId === projectId && t.taskColumnId === taskColumn.id,
        ) ?? initialProjectsTaskColumnState()
      )
    },
})

export const initialProjectsTaskColumnState = (): ProjectsTaskColumn => ({
  id: '',
  taskColumnId: '',
  projectId: '',
  width: '',
  disabled: false,
  customizable: false,
  order: 0,
  createdAt: '',
  updatedAt: '',
})

const state = atomFamily<ProjectsTaskColumn, string>({
  key: key('state'),
  default: initialProjectsTaskColumnState(),
})

export const projectsTaskColumnState = selectorFamily<
  ProjectsTaskColumn,
  string
>({
  key: key('projectsTaskColumn'),
  get:
    (projectsTaskColumnId) =>
    ({ get }) =>
      get(state(projectsTaskColumnId)),
  set:
    (projectsTaskColumnId) =>
    ({ set, reset, get }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(projectsTaskColumnId))
        return
      }

      set(state(projectsTaskColumnId), newVal)
      set(projectsTaskColumnsState, (prev) =>
        uniqBy([...prev, newVal], 'id').map((p) =>
          p.id === newVal.id ? { ...p, ...newVal } : p,
        ),
      )

      if (
        get(projectsTaskColumnIdsState).find((taskId) => taskId === newVal.id)
      )
        return

      set(projectsTaskColumnIdsState, (prev) => [...prev, newVal.id])
    },
})
