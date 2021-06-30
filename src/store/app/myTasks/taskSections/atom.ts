import { selectorFamily, useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { taskSectionsState } from 'src/store/entities/taskSections'

export const myTasksTaskSectionIdsSelector = selectorFamily<string[], string>({
  key: 'tasksAttachmentIdsSelector',
  get:
    (teammateId) =>
    ({ get }) => {
      const taskSections = get(taskSectionsState)
      return taskSections
        .filter((t) => !t.isDeleted && t.teammateId === teammateId)
        .map((t) => t.id)
    },
})

export const useMyTasksTaskSectionIds = () => {
  const { me } = useMe()
  const taskSectionIds = useRecoilValue(myTasksTaskSectionIdsSelector(me.id))

  return {
    taskSectionIds,
  }
}
