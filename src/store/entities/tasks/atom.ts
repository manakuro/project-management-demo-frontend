import { useCallback } from 'react'
import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
} from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { uuid } from 'src/shared/uuid'
import { attachmentSelector } from 'src/store/entities/attachments'
import { feedSelector } from 'src/store/entities/feeds'
import { subtaskSelector } from 'src/store/entities/subtasks'
import { tagSelector } from 'src/store/entities/tags'
import { teammateSelector } from 'src/store/entities/teammates'
import { Task, TaskResponse } from './type'

export const taskIdsState = atom<string[]>({
  key: 'taskIdsState',
  default: [],
})
export const tasksState = atom<Task[]>({
  key: 'tasksState',
  default: [],
})

const defaultTaskState = (): Task => ({
  id: '',
  taskSectionId: '',
  projectIds: [],
  projects: [],
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
  teammates: [],
  teammateIds: [],
  tags: [],
  tagIds: [],
  isNew: false,
  isDeleted: false,
})
const taskState = atomFamily<Task, string>({
  key: 'taskState',
  default: defaultTaskState(),
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

      if (newVal.isDeleted) {
        set(taskIdsState, (prev) => prev.filter((id) => id !== newVal.id))
        return
      }

      if (get(taskIdsState).find((taskId) => taskId === newVal.id)) return

      set(taskIdsState, (prev) => [...prev, newVal.id])
    },
})

export const useTasksCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (task: Task) => {
        set(taskSelector(task.id), task)
      },
    [],
  )

  const addTask = useCallback(
    (val?: Partial<Task>) => {
      const id = uuid()
      upsert({
        ...defaultTaskState(),
        ...val,
        isNew: true,
        id,
      })

      return id
    },
    [upsert],
  )

  return {
    addTask,
  }
}

export const useTasks = () => {
  const taskIds = useRecoilValue(taskIdsState)
  const { setSubtasks, setAttachments, setFeeds, setTags } = useSetters()

  const setTasks = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        const tasks = data.map((t) => ({
          ...t,
          projectIds: t.projects.map((p) => p.id),
          subTaskIds: t.subTasks.map((s) => s.id),
          attachmentIds: t.attachments.map((a) => a.id),
          feedIds: t.feeds.map((f) => f.id),
          teammateIds: t.teammates.map((t) => t.id),
          tagIds: t.tags.map((t) => t.id),
        }))

        tasks.forEach((t) => {
          set(taskSelector(t.id), t)
        })

        setSubtasks(data)
        setAttachments(data)
        setFeeds(data)
        setTags(data)
      },
    [setAttachments, setFeeds, setSubtasks, setTags],
  )

  return {
    taskIds,
    setTasks,
  }
}

export const useTask = (taskId?: string) => {
  const task = useRecoilValue(taskSelector(taskId || ''))
  const { setSubtasks, setAttachments, setFeeds, setTeammates, setTags } =
    useSetters()

  const upsert = useRecoilCallback(
    ({ set }) =>
      (task: Task) => {
        set(taskSelector(task.id), task)
      },
    [],
  )
  const setTask = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<Task>) => {
        const prev = await snapshot.getPromise(taskSelector(task.id))
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert, task.id],
  )
  const deleteTask = useRecoilCallback(
    () => async () => {
      await setTask({ isDeleted: true })
    },
    [setTask],
  )

  const setTaskFromResponse = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse) => {
        const task: Task = {
          ...data,
          projectIds: data.projects.map((p) => p.id),
          subTaskIds: data.subTasks.map((s) => s.id),
          attachmentIds: data.attachments.map((a) => a.id),
          feedIds: data.feeds.map((f) => f.id),
          teammateIds: data.teammates.map((t) => t.id),
          tagIds: data.tags.map((t) => t.id),
        }
        set(taskSelector(task.id), task)

        setSubtasks([data])
        setAttachments([data])
        setFeeds([data])
        setTeammates([data])
        setTags([data])
      },
    [setAttachments, setFeeds, setSubtasks, setTeammates, setTags],
  )

  return {
    task,
    setTask,
    setTaskFromResponse,
    deleteTask,
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
  const setTeammates = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        data
          .reduce<Task['teammates']>(
            (acc, p) => uniqBy([...acc, ...p.teammates], 'id'),
            [],
          )
          .forEach((f) => set(teammateSelector(f.id), f))
      },
    [],
  )
  const setTags = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        data
          .reduce<Task['tags']>(
            (acc, p) => uniqBy([...acc, ...p.tags], 'id'),
            [],
          )
          .forEach((f) => set(tagSelector(f.id), f))
      },
    [],
  )

  return {
    setSubtasks,
    setAttachments,
    setFeeds,
    setTeammates,
    setTags,
  }
}
