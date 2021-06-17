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
  assigneeId: '',
  attachmentIds: [],
  attachments: [],
  dueDate: '',
  dueTime: '',
  feedIds: [],
  feeds: [],
  id: '',
  isDeleted: false,
  isDone: false,
  isNew: false,
  name: '',
  projectIds: [],
  projects: [],
  tagIds: [],
  tags: [],
  taskParentId: '',
  taskSectionId: '',
  teammateIds: [],
  teammates: [],
})
export const taskIdsByTaskParentIdSelector = selectorFamily<string[], string>({
  key: 'taskIdsByTaskParentIdSelector',
  get:
    (taskParentId) =>
    ({ get }) => {
      const tasks = get(tasksState)
      return tasks
        .filter((t) => t.taskParentId === taskParentId && !t.isDeleted)
        .map((t) => t.id)
    },
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

export const useTaskIdsByTaskParentId = (taskParentId: string) => {
  const taskIds = useRecoilValue(taskIdsByTaskParentIdSelector(taskParentId))
  const taskCommand = useTasksCommand()

  const addTask = useRecoilCallback(
    ({ snapshot }) =>
      async (val?: Partial<Task>) => {
        const parentTask = await snapshot.getPromise(taskSelector(taskParentId))

        taskCommand.addTask({
          ...val,
          taskSectionId: parentTask.taskSectionId,
          taskParentId,
        })
      },
    [taskCommand, taskParentId],
  )

  return {
    taskIds,
    addTask,
  }
}

export const useTasks = () => {
  const taskIds = useRecoilValue(taskIdsState)
  const { setTasks, setAttachments, setFeeds, setTags } = useSetters()

  const set = useRecoilCallback(
    () => (data: TaskResponse[]) => {
      setTasks(data)
      setAttachments(data)
      setFeeds(data)
      setTags(data)
    },
    [setAttachments, setFeeds, setTags, setTasks],
  )

  return {
    taskIds,
    setTasks: set,
  }
}

export const useTask = (taskId?: string) => {
  const task = useRecoilValue(taskSelector(taskId || ''))
  const setters = useSetters()

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

  const setTaskName = useRecoilCallback(
    ({ snapshot }) =>
      async (val: string) => {
        const current = await snapshot.getPromise(taskSelector(task.id))
        const isNew = current.isNew && !!val ? { isNew: false } : {}
        await setTask({ name: val, ...isNew })
      },
    [setTask, task.id],
  )

  const setTaskFromResponse = useRecoilCallback(
    () => (data: TaskResponse) => {
      setters.setTasks([data])
      setters.setAttachments([data])
      setters.setFeeds([data])
      setters.setTeammates([data])
      setters.setTags([data])
    },
    [setters],
  )

  return {
    task,
    setTask,
    setTaskFromResponse,
    deleteTask,
    setTaskName,
  }
}

const useSetters = () => {
  const setTaskValue = useRecoilCallback(({ set }) => (data: TaskResponse) => {
    const task: Task = {
      ...data,
      projectIds: data.projects.map((p) => p.id),
      attachmentIds: data.attachments.map((a) => a.id),
      feedIds: data.feeds.map((f) => f.id),
      teammateIds: data.teammates.map((t) => t.id),
      tagIds: data.tags.map((t) => t.id),
    }
    set(taskSelector(task.id), task)
  })
  const setTask = useCallback(
    (data: TaskResponse) => {
      // if (data.subTasks.length) {
      //   data.subTasks.forEach((t) => {
      //     setTask(t)
      //   })
      //   setTaskValue(data)
      //   return
      // }
      setTaskValue(data)
    },
    [setTaskValue],
  )

  const setTasks = useCallback(
    (data: TaskResponse[]) => {
      data.forEach((t) => {
        setTask(t)
      })
    },
    [setTask],
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
    setAttachments,
    setFeeds,
    setTeammates,
    setTags,
    setTasks,
  }
}
