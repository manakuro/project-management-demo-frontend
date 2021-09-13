import { atom, atomFamily, DefaultValue, selectorFamily } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { ArchivedWorkspaceActivityTask } from './type'

const key = (str: string) =>
  `src/store/app/inbox/activity/archivedWorkspaceActivityTasks/${str}`

export const archivedWorkspaceActivityTaskIdsState = atom<string[]>({
  key: key('archivedWorkspaceActivityTaskIdsState'),
  default: [],
})
export const archivedWorkspaceActivityTasksState = atom<
  ArchivedWorkspaceActivityTask[]
>({
  key: key('archivedWorkspaceActivityTasksState'),
  default: [],
})
export const taskIdsByArchivedWorkspaceActivityIdSelector = selectorFamily<
  string[],
  string
>({
  key: key('taskIdsByArchivedWorkspaceActivityIdSelector'),
  get:
    (archivedWorkspaceActivityId: string) =>
    ({ get }) => {
      const archivedWorkspaceActivityTasks = get(
        archivedWorkspaceActivityTasksState,
      )
      return archivedWorkspaceActivityTasks
        .filter(
          (w) => w.archivedWorkspaceActivityId === archivedWorkspaceActivityId,
        )
        .map((w) => w.taskId)
    },
})

export const archivedWorkspaceActivityTaskState = atomFamily<
  ArchivedWorkspaceActivityTask,
  string
>({
  key: key('archivedWorkspaceActivityTaskState'),
  default: {
    id: '',
    archivedWorkspaceActivityId: '',
    taskId: '',
    createdAt: '',
    updatedAt: '',
  },
})

export const archivedWorkspaceActivityTaskSelector = selectorFamily<
  ArchivedWorkspaceActivityTask,
  string
>({
  key: key('archivedWorkspaceActivityTaskSelector'),
  get:
    (archivedWorkspaceActivityTaskId) =>
    ({ get }) =>
      get(archivedWorkspaceActivityTaskState(archivedWorkspaceActivityTaskId)),
  set:
    (archivedWorkspaceActivityTaskId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(
          archivedWorkspaceActivityTaskState(archivedWorkspaceActivityTaskId),
        )
        return
      }

      set(
        archivedWorkspaceActivityTaskState(archivedWorkspaceActivityTaskId),
        newVal,
      )
      set(archivedWorkspaceActivityTasksState, (prev) =>
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

      if (
        get(archivedWorkspaceActivityTaskIdsState).find(
          (archivedWorkspaceActivityTaskId) =>
            archivedWorkspaceActivityTaskId === newVal.id,
        )
      )
        return
      set(archivedWorkspaceActivityTaskIdsState, (prev) => [...prev, newVal.id])
    },
})
