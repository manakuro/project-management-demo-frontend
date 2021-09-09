import { atom, atomFamily, DefaultValue, selectorFamily } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { WorkspaceActivityTask } from './type'

const key = (str: string) =>
  `src/store/app/inbox/activity/workspaceActivityTasks/${str}`

export const workspaceActivityTaskIdsState = atom<string[]>({
  key: key('workspaceActivityTaskIdsState'),
  default: [],
})
export const workspaceActivityTasksState = atom<WorkspaceActivityTask[]>({
  key: key('workspaceActivityTasksState'),
  default: [],
})
export const taskIdsByWorkspaceActivityIdSelector = selectorFamily<
  string[],
  string
>({
  key: key('workspaceActivityTasksTaskIdsSelector'),
  get:
    (workspaceActivityId: string) =>
    ({ get }) => {
      const workspaceActivityTasks = get(workspaceActivityTasksState)
      return workspaceActivityTasks
        .filter((w) => w.workspaceActivityId === workspaceActivityId)
        .map((w) => w.taskId)
    },
})

export const workspaceActivityTaskState = atomFamily<
  WorkspaceActivityTask,
  string
>({
  key: key('workspaceActivityTaskState'),
  default: {
    id: '',
    workspaceActivityId: '',
    taskId: '',
    createdAt: '',
    updatedAt: '',
  },
})

export const workspaceActivityTaskSelector = selectorFamily<
  WorkspaceActivityTask,
  string
>({
  key: key('workspaceActivityTaskSelector'),
  get:
    (workspaceActivityTaskId) =>
    ({ get }) =>
      get(workspaceActivityTaskState(workspaceActivityTaskId)),
  set:
    (workspaceActivityTaskId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(workspaceActivityTaskState(workspaceActivityTaskId))
        return
      }

      set(workspaceActivityTaskState(workspaceActivityTaskId), newVal)
      set(workspaceActivityTasksState, (prev) =>
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
        get(workspaceActivityTaskIdsState).find(
          (workspaceActivityTaskId) => workspaceActivityTaskId === newVal.id,
        )
      )
        return
      set(workspaceActivityTaskIdsState, (prev) => [...prev, newVal.id])
    },
})
