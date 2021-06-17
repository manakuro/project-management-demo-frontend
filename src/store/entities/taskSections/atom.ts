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
import { tasksState, useTasks, useTasksCommand } from 'src/store/entities/tasks'
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
  createdAt: '',
  updatedAt: '',
})
const taskSectionState = atomFamily<TaskSection, string>({
  key: 'taskSectionState',
  default: defaultTaskSectionStateValue(),
})

export const taskSectionsTaskIdsSelector = selectorFamily<string[], string>({
  key: 'taskSectionsTaskIdsSelector',
  get:
    (taskSectionId) =>
    ({ get }) => {
      const tasks = get(tasksState)
      return tasks
        .filter(
          (t) =>
            !t.isDeleted &&
            taskSectionId === t.taskSectionId &&
            !t.taskParentId,
        )
        .map((t) => t.id)
    },
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
  const { setTasksFromResponse } = useTasks()

  const setTaskSections = useRecoilCallback(
    ({ set }) =>
      (data: TaskSectionResponse[]) => {
        data.forEach((d) => {
          set(taskSectionSelector(d.id), d)
          setTasksFromResponse(d.tasks)
        })
      },
    [setTasksFromResponse],
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

export const useTaskSectionTaskIds = (taskSectionId?: string) => {
  const taskIds = useRecoilValue(
    taskSectionsTaskIdsSelector(taskSectionId || ''),
  )

  return {
    taskIds,
  }
}

export const useTaskSection = (taskSectionId?: string) => {
  const taskSection = useRecoilValue(taskSectionSelector(taskSectionId || ''))
  const { upsert } = useTaskSectionsCommand()
  const useTasksCommandResult = useTasksCommand()

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
    () => async (val?: Partial<TaskSection>) => {
      useTasksCommandResult.addTask({ ...val, taskSectionId })
    },
    [useTasksCommandResult, taskSectionId],
  )

  return {
    taskSection,
    setTaskSection,
    addTask,
  }
}
