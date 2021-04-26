import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
} from 'recoil'
import { Task } from './type'
import { uniqBy } from 'src/shared/utils'

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
    ({ set }) => (tasks: Task[]) => {
      tasks.forEach((p) => {
        set(taskSelector(p.id), p)
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
