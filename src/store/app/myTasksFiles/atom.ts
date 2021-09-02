import { selectorFamily } from 'recoil'
import { attachmentsState } from 'src/store/entities/attachments'
import { taskIdsByAssigneeIdSelector } from 'src/store/entities/tasks'

const key = (str: string) => `src/store/app/myTasks/attachments/${str}`

export const attachmentIdsSelector = selectorFamily<string[], string>({
  key: key('attachmentIdsSelector'),
  get:
    (teammateId: string) =>
    ({ get }) => {
      const attachments = get(attachmentsState)
      const taskIds = get(taskIdsByAssigneeIdSelector(teammateId))
      return attachments
        .filter((a) => taskIds.includes(a.taskId))
        .map((a) => a.id)
    },
})
