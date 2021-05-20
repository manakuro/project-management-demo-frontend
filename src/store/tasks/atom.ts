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
import { attachmentSelector } from 'src/store/attachments'
import { feedSelector } from 'src/store/feeds'

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
    attachments: [],
    attachmentIds: [],
    feeds: [],
    feedIds: [],
  },
})

export const taskSelector = selectorFamily<Task, string>({
  key: 'taskSelector',
  get:
    (taskId) =>
    ({ get }) =>
      get(taskState(taskId)),
  set:
    (taskId) =>
    ({ get, set, reset }, newVal) => {
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
  const { setSubtasks, setAttachments, setFeeds } = useSetters()

  const setTasks = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        const tasks = data.map((t) => ({
          ...t,
          subTaskIds: t.subTasks.map((s) => s.id),
          attachmentIds: t.attachments.map((a) => a.id),
          feedIds: t.feeds.map((f) => f.id),
        }))

        tasks.forEach((t) => {
          set(taskSelector(t.id), t)
        })

        setSubtasks(data)
        setAttachments(data)
        setFeeds(data)
      },
    [setAttachments, setFeeds, setSubtasks],
  )

  return {
    taskIds,
    tasks,
    setTasks,
  }
}

export const useTask = (taskId?: string) => {
  const task = useRecoilValue(taskSelector(taskId || ''))
  const { setSubtasks, setAttachments, setFeeds } = useSetters()

  const upsertTask = useRecoilCallback(
    ({ set }) =>
      (task: Task) => {
        set(taskSelector(task.id), task)
      },
    [],
  )

  const setTaskFromResponse = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse) => {
        const task: Task = {
          ...data,
          subTaskIds: data.subTasks.map((s) => s.id),
          attachmentIds: data.attachments.map((a) => a.id),
          feedIds: data.feeds.map((f) => f.id),
        }
        set(taskSelector(task.id), task)

        setSubtasks([data])
        setAttachments([data])
        setFeeds([data])
      },
    [setAttachments, setFeeds, setSubtasks],
  )

  return {
    task,
    upsertTask,
    setTaskFromResponse,
  }
}

const useSetters = () => {
  const setSubtasks = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        data
          .reduce<Task['subTasks']>(
            (acc, p) => uniqBy([...acc, ...p.subTasks], 'id'),
            [],
          )
          .forEach((t) => set(subtaskSelector(t.id), t))
      },
    [],
  )
  const setAttachments = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        data
          .reduce<Task['attachments']>(
            (acc, p) => uniqBy([...acc, ...p.attachments], 'id'),
            [],
          )
          .forEach((t) => set(attachmentSelector(t.id), t))
      },
    [],
  )
  const setFeeds = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        data
          .reduce<Task['feeds']>(
            (acc, p) => uniqBy([...acc, ...p.feeds], 'id'),
            [],
          )
          .forEach((f) => set(feedSelector(f.id), f))
      },
    [],
  )

  return {
    setSubtasks,
    setAttachments,
    setFeeds,
  }
}
