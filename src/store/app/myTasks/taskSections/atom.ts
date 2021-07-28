import { useMemo } from 'react'
import { selectorFamily, useRecoilValue } from 'recoil'
import {
  myTaskTaskStatusState,
  TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
  TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
  TASK_LIST_SORT_STATUS_TYPE_LIKES,
  TASK_LIST_SORT_STATUS_TYPE_PROJECT,
} from 'src/store/app/myTasks'
import { useMe } from 'src/store/entities/me'
import { TaskSection, taskSectionsState } from 'src/store/entities/taskSections'
import { taskSectionsTasksSelector } from 'src/store/entities/taskSections/tasks'

const key = (str: string) => `src/store/app/myTasks/taskSections/${str}`

const filter = (teammateId: string) => (t: TaskSection) =>
  !t.isDeleted && t.teammateId === teammateId

export const myTasksTaskSectionIdsSelector = selectorFamily<string[], string>({
  key: key('tasksAttachmentIdsSelector'),
  get:
    (teammateId) =>
    ({ get }) => {
      const taskSections = get(taskSectionsState)
      const taskStatus = get(myTaskTaskStatusState)

      switch (true) {
        case taskStatus.sortStatus === TASK_LIST_SORT_STATUS_TYPE_DUE_DATE: {
          const hasTaskWithNoDueDate = !!taskSections
            .filter(filter(teammateId))
            .filter((taskSection) => {
              const tasks = get(taskSectionsTasksSelector(taskSection.id))
              return tasks.some((t) => !t.dueDate)
            }).length
          if (!hasTaskWithNoDueDate) return []

          return taskSections.filter(filter(teammateId)).map((t) => t.id)
        }
        case taskStatus.sortStatus === TASK_LIST_SORT_STATUS_TYPE_LIKES: {
          return []
        }
        case taskStatus.sortStatus ===
          TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL: {
          return []
        }
        case taskStatus.sortStatus === TASK_LIST_SORT_STATUS_TYPE_PROJECT: {
          return []
        }
        default: {
          return taskSections.filter(filter(teammateId)).map((t) => t.id)
        }
      }
    },
})

const myTasksTaskSectionsSelector = selectorFamily<TaskSection[], string>({
  key: key('myTasksTaskSectionsSelector'),
  get:
    (teammateId) =>
    ({ get }) => {
      const taskSections = get(taskSectionsState)
      return taskSections.filter(filter(teammateId))
    },
})

export const useMyTasksTaskSectionIds = () => {
  const { me } = useMe()
  const ids = useRecoilValue(myTasksTaskSectionIdsSelector(me.id))
  const taskSectionIds = useMemo(() => ids, [ids])

  return {
    taskSectionIds,
  }
}

export const useMyTasksTaskSections = () => {
  const { me } = useMe()
  const taskSections = useRecoilValue(myTasksTaskSectionsSelector(me.id))

  return {
    taskSections,
  }
}
