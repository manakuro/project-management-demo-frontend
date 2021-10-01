import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { taskColumnByTypeState } from 'src/store/entities/taskColumns'
import { TaskColumnType } from 'src/store/entities/taskColumns/types'
import { ProjectsTaskColumn } from './type'

const key = (str: string) => `src/store/entities/projectsTaskColumns/${str}`

export const projectsTaskColumnIds = atom<string[]>({
  key: key('projectsTaskColumnIds'),
  default: [],
})

export const projectsTaskColumns = atom<ProjectsTaskColumn[]>({
  key: key('projectsTaskColumns'),
  default: [],
})

export const projectsTaskColumnsByProjectId = selectorFamily<
  ProjectsTaskColumn[],
  string
>({
  key: key('projectsTaskColumnsByProjectId'),
  get:
    (projectId: string) =>
    ({ get }) => {
      const taskColumns = get(projectsTaskColumns)
      return taskColumns.filter((t) => t.projectId === projectId)
    },
})

export const projectsTaskColumnByType = selectorFamily<
  ProjectsTaskColumn,
  { projectId: string; type: TaskColumnType }
>({
  key: key('projectsTaskColumnByType'),
  get:
    ({ projectId, type }) =>
    ({ get }) => {
      const taskColumn = get(taskColumnByTypeState(type))
      const taskColumns = get(projectsTaskColumns)
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
      set(projectsTaskColumns, (prev) =>
        uniqBy([...prev, newVal], 'id').map((p) =>
          p.id === newVal.id ? { ...p, ...newVal } : p,
        ),
      )

      if (get(projectsTaskColumnIds).find((taskId) => taskId === newVal.id))
        return

      set(projectsTaskColumnIds, (prev) => [...prev, newVal.id])
    },
})
