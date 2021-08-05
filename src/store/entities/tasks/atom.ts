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
import { projectTaskSelector } from 'src/store/entities/projectTasks'
import { tagSelector } from 'src/store/entities/tags'
import { taskTeammateSelector } from 'src/store/entities/taskTeammates'
import { useTeammateCommand } from 'src/store/entities/teammates'
import { Task, TaskResponse } from './type'

const key = (str: string) => `src/store/entities/tasks/${str}`

export const taskIdsState = atom<string[]>({
  key: key('taskIdsState'),
  default: [],
})
export const tasksState = atom<Task[]>({
  key: key('tasksState'),
  default: [],
})

const defaultTaskState = (): Task => ({
  assigneeId: '',
  dueDate: '',
  dueTime: '',
  id: '',
  isDeleted: false,
  isDone: false,
  doneAt: '',
  isNew: false,
  name: '',
  taskParentId: '',
  taskSectionId: '',
})
export const taskIdsByTaskParentIdSelector = selectorFamily<string[], string>({
  key: key('taskIdsByTaskParentIdSelector'),
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
  key: key('taskState'),
  default: defaultTaskState(),
})

export const taskSelector = selectorFamily<Task, string>({
  key: key('taskSelector'),
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
  const { setTasks, setAttachments, setFeeds, setTags, setProjects } =
    useSetters()

  const setTasksFromResponse = useRecoilCallback(
    () => (data: TaskResponse[]) => {
      setTasks(data)
      setAttachments(data)
      setFeeds(data)
      setTags(data)
      setProjects(data)
    },
    [setAttachments, setFeeds, setTags, setTasks, setProjects],
  )

  return {
    taskIds,
    setTasksFromResponse,
  }
}

export const useTask = (taskId?: string) => {
  const task = useRecoilValue(taskSelector(taskId || ''))
  const {
    setTasks,
    setAttachments,
    setFeeds,
    setTags,
    setTeammates,
    setProjects,
  } = useSetters()

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
  const undeleteTask = useRecoilCallback(
    () => async () => {
      await setTask({ isDeleted: false })
    },
    [setTask],
  )

  const setTaskName = useRecoilCallback(
    ({ snapshot }) =>
      async (val: string) => {
        const current = await snapshot.getPromise(taskSelector(task.id))
        // Skip when touching input for the first time
        if (current.isNew && !current.name && !val) return

        const isNew = current.isNew && !!val ? { isNew: false } : {}
        await setTask({ name: val, ...isNew })
      },
    [setTask, task.id],
  )

  const setTaskFromResponse = useRecoilCallback(
    () => (data: TaskResponse) => {
      setTasks([data])
      setAttachments([data])
      setFeeds([data])
      setTeammates([data])
      setTags([data])
      setProjects([data])
    },
    [setAttachments, setFeeds, setTags, setTasks, setTeammates, setProjects],
  )

  return {
    task,
    setTask,
    setTaskFromResponse,
    deleteTask,
    undeleteTask,
    setTaskName,
  }
}

const useSetters = () => {
  const { setTeammatesFromResponse } = useTeammateCommand()

  const setTaskValue = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse) => {
        set(taskSelector(data.id), data)
      },
    [],
  )
  const setTask = useCallback(
    (data: TaskResponse) => {
      if (data.subTasks.length) {
        data.subTasks.forEach((t) => {
          setTask(t)
        })
        setTaskValue(data)
        return
      }
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
          .reduce<TaskResponse['attachments']>(
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
          .reduce<TaskResponse['feeds']>(
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
        const taskTeammates = data.reduce<TaskResponse['teammates']>(
          (acc, d) => [...acc, ...d.teammates],
          [],
        )
        taskTeammates.forEach((t) => set(taskTeammateSelector(t.id), t))

        setTeammatesFromResponse(taskTeammates)
      },
    [setTeammatesFromResponse],
  )
  const setTags = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        data
          .reduce<TaskResponse['tags']>(
            (acc, p) => uniqBy([...acc, ...p.tags], 'id'),
            [],
          )
          .forEach((f) => set(tagSelector(f.id), f))
      },
    [],
  )

  const setProjects = useRecoilCallback(
    ({ set }) =>
      (data: TaskResponse[]) => {
        data
          .reduce<TaskResponse['projects']>(
            (acc, p) => uniqBy([...acc, ...p.projects], 'id'),
            [],
          )
          .forEach((p) => set(projectTaskSelector(p.id), p))
      },
    [],
  )

  return {
    setAttachments,
    setFeeds,
    setTeammates,
    setTags,
    setTasks,
    setProjects,
  }
}
