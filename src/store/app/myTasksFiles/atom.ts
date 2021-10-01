import { selectorFamily } from 'recoil'
import { attachmentsState } from 'src/store/entities/attachments'
import { taskIdsByAssigneeIdState } from 'src/store/entities/tasks'

const key = (str: string) => `src/store/app/myTasks/attachments/${str}`

export const attachmentIdsState = selectorFamily<string[], string>({
  key: key('attachmentIdsState'),
  get:
    (teammateId: string) =>
    ({ get }) => {
      const attachments = get(attachmentsState)
      const taskIds = get(taskIdsByAssigneeIdState(teammateId))
      return attachments
        .filter((a) => taskIds.includes(a.taskId))
        .map((a) => a.id)
    },
})
