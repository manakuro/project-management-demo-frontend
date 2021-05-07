import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
} from 'recoil'
import { Task, TaskResponse } from './type'
import { uniqBy } from 'src/shared/utils'
import { subtaskSelector } from 'src/store/subtasks'

export const taskIdsState = atom<string[]>({
  key: 'taskIdsState',
  default: [],
})
export const tasksState = atom<Task[]>({
  key: 'tasksState',
  default: [],
})

const taskState = atomFamily<Task, string>({
  key: 'taskState',
  default: {
    id: '',
    projectId: '',
    name: '',
    dueDate: '',
    dueTime: '',
    isDone: false,
    subTaskIds: [],
    subTasks: [],
    assigneeId: '',
  },
})

export const taskSelector = selectorFamily<Task, string>({
  key: 'taskSelector',
  get: (taskId) => ({ get }) => get(taskState(taskId)),
  set: (taskId) => ({ get, set, reset }, newVal) => {
    if (newVal instanceof DefaultValue) {
      reset(taskState(taskId))
      return
    }

    set(taskState(taskId), newVal)
    set(tasksState, (prev) =>
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

    if (get(taskIdsState).find((taskId) => taskId === newVal.id)) return
    set(taskIdsState, (prev) => [...prev, newVal.id])
  },
})

export const useTasks = () => {
  const taskIds = useRecoilValue(taskIdsState)
  const tasks = useRecoilValue(tasksState)

  const setTasks = useRecoilCallback(
    ({ set }) => (data: TaskResponse[]) => {
      const tasks = data.map((t) => ({
        ...t,
        subTaskIds: t.subTasks.map((s) => s.id),
      }))

      tasks.forEach((t) => {
        set(taskSelector(t.id), t)

        t.subTasks.forEach((s) => {
          set(subtaskSelector(s.id), s)
        })
      })
    },
    [],
  )

  return {
    taskIds,
    tasks,
    setTasks,
  }
}

export const useTask = (taskId: string) => {
  const task = useRecoilValue(taskSelector(taskId))

  const upsertTask = useRecoilCallback(
    ({ set }) => (task: Task) => {
      set(taskSelector(task.id), task)
    },
    [],
  )

  return {
    task,
    upsertTask,
  }
}
