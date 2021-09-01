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
import { useTasksResponse } from 'src/store/entities/tasks'
import { TaskSection, TaskSectionResponse } from './type'

const key = (str: string) => `src/store/entities/taskSections/${str}`

export const DEFAULT_TITLE_NAME = 'Untitled Section'

export const taskSectionIdsState = atom<string[]>({
  key: key('taskSectionIdsState'),
  default: [],
})

export const taskSectionsState = atom<TaskSection[]>({
  key: key('taskSectionsState'),
  default: [],
})

export const defaultTaskSectionStateValue = (): TaskSection => ({
  id: '',
  name: DEFAULT_TITLE_NAME,
  teammateId: '',
  createdAt: '',
  updatedAt: '',
  isDeleted: false,
})
const taskSectionState = atomFamily<TaskSection, string>({
  key: key('taskSectionState'),
  default: defaultTaskSectionStateValue(),
})

export const taskSectionSelector = selectorFamily<TaskSection, string>({
  key: key('taskSectionSelector'),
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
  const { setTasksFromResponse } = useTasksResponse()

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

  const addTaskSection = useCallback(
    (val?: Partial<TaskSection>) => {
      const id = uuid()
      upsert({
        ...defaultTaskSectionStateValue(),
        ...val,
        id,
      })

      return id
    },
    [upsert],
  )

  return {
    upsert,
    addTaskSection,
  }
}

export const useTaskSection = (taskSectionId?: string) => {
  const taskSection = useRecoilValue(taskSectionSelector(taskSectionId || ''))
  const { upsert } = useTaskSectionsCommand()

  const setTaskSection = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TaskSection>) => {
        const prev = await snapshot.getPromise(
          taskSectionSelector(taskSection.id),
        )
        upsert({ ...prev, ...val })
      },
    [upsert, taskSection.id],
  )

  const setSectionName = useRecoilCallback(
    () => async (val: string) => {
      if (taskSection.name === val) return
      const name = val || DEFAULT_TITLE_NAME

      await setTaskSection({ name })
    },
    [setTaskSection, taskSection.name],
  )

  return {
    taskSection,
    setTaskSection,
    setSectionName,
  }
}
