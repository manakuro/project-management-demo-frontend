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
export const taskIdsByWorkspaceActivityIdState = selectorFamily<
  string[],
  string
>({
  key: key('taskIdsByWorkspaceActivityIdState'),
  get:
    (workspaceActivityId: string) =>
    ({ get }) => {
      const workspaceActivityTasks = get(workspaceActivityTasksState)
      return workspaceActivityTasks
        .filter((w) => w.workspaceActivityId === workspaceActivityId)
        .map((w) => w.taskId)
    },
})

const state = atomFamily<WorkspaceActivityTask, string>({
  key: key('state'),
  default: {
    id: '',
    workspaceActivityId: '',
    taskId: '',
    createdAt: '',
    updatedAt: '',
  },
})

export const workspaceActivityTaskState = selectorFamily<
  WorkspaceActivityTask,
  string
>({
  key: key('workspaceActivityTaskState'),
  get:
    (workspaceActivityTaskId) =>
    ({ get }) =>
      get(state(workspaceActivityTaskId)),
  set:
    (workspaceActivityTaskId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(workspaceActivityTaskId))
        return
      }

      set(state(workspaceActivityTaskId), newVal)
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
