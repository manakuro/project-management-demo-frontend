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
import { useTasks, useTasksCommand } from 'src/store/entities/tasks'
import { TaskSection, TaskSectionResponse } from './type'

export const taskSectionIdsState = atom<string[]>({
  key: 'taskSectionIdsState',
  default: [],
})

export const taskSectionsState = atom<TaskSection[]>({
  key: 'taskSectionsState',
  default: [],
})

export const defaultTaskSectionStateValue = (): TaskSection => ({
  id: '',
  name: '',
  teammateId: '',
  taskIds: [],
  tasks: [],
  createdAt: '',
  updatedAt: '',
})
const taskSectionState = atomFamily<TaskSection, string>({
  key: 'taskSectionState',
  default: defaultTaskSectionStateValue(),
})

export const taskSectionSelector = selectorFamily<TaskSection, string>({
  key: 'taskSectionSelector',
  get:
    (taskSectionId) =>
    ({ get }) =>
      get(taskSectionState(taskSectionId)),
  set:
    (taskSectionId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(taskSectionState(taskSectionId))
        return
      }

      set(taskSectionState(taskSectionId), newVal)
      set(taskSectionsState, (prev) =>
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
        get(taskSectionIdsState).find(
          (taskSectionId) => taskSectionId === newVal.id,
        )
      )
        return

      set(taskSectionIdsState, (prev) => [...prev, newVal.id])
    },
})

export const useTaskSections = () => {
  const taskSectionIds = useRecoilValue(taskSectionIdsState)
  const { setTasks } = useTasks()

  const setTaskSections = useRecoilCallback(
    ({ set }) =>
      (data: TaskSectionResponse[]) => {
        const taskSections = data.map((d) => ({
          ...d,
          taskIds: d.tasks.map((t) => t.id),
        }))
        taskSections.forEach((d) => {
          set(taskSectionSelector(d.id), d)
          setTasks(d.tasks)
        })
      },
    [setTasks],
  )

  return {
    taskSectionIds,
    setTaskSections,
  }
}
export const useTaskSectionsCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskSection: TaskSection) => {
        set(taskSectionSelector(taskSection.id), taskSection)
      },
    [],
  )

  const addTaskSection = useCallback(() => {
    const id = uuid()
    upsert({
      ...defaultTaskSectionStateValue(),
      id,
    })

    return id
  }, [upsert])

  return {
    upsert,
    addTaskSection,
  }
}

export const useTaskSection = (taskSectionId?: string) => {
  const taskSection = useRecoilValue(taskSectionSelector(taskSectionId || ''))
  const { upsert } = useTaskSectionsCommand()
  const tasksCommand = useTasksCommand()

  const setTaskSection = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TaskSection>) => {
        const prev = await snapshot.getPromise(
          taskSectionSelector(taskSection.id),
        )
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert, taskSection.id],
  )

  const addTask = useRecoilCallback(
    ({ snapshot }) =>
      async (val?: Partial<TaskSection>) => {
        const prev = await snapshot.getPromise(
          taskSectionSelector(taskSection.id),
        )
        const newTaskId = tasksCommand.addTask()
        const taskIds = [...prev.taskIds, newTaskId]

        await setTaskSection({ ...val, taskIds })
      },
    [taskSection.id, tasksCommand, setTaskSection],
  )

  return {
    taskSection,
    setTaskSection,
    addTask,
  }
}
