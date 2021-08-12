import { useMemo } from 'react'
import { selectorFamily, useRecoilValue } from 'recoil'
import { isMyTaskSortStatus } from 'src/store/app/myTasks'
import { isMyTaskTabStatus } from 'src/store/app/myTasks/taskTabStatus'
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

      switch (true) {
        case get(isMyTaskTabStatus('list')): {
          switch (true) {
            case get(isMyTaskSortStatus('dueDate')): {
              const hasTaskWithNoDueDate = !!taskSections
                .filter(filter(teammateId))
                .filter((taskSection) => {
                  const tasks = get(taskSectionsTasksSelector(taskSection.id))
                  return tasks.some((t) => !t.dueDate)
                }).length
              if (!hasTaskWithNoDueDate) return []

              return taskSections.filter(filter(teammateId)).map((t) => t.id)
            }
            case get(isMyTaskSortStatus('likes')):
            case get(isMyTaskSortStatus('alphabetical')): {
              return []
            }
            default: {
              return taskSections.filter(filter(teammateId)).map((t) => t.id)
            }
          }
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
