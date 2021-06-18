import { useCallback } from 'react'
import { selectorFamily, useRecoilValue } from 'recoil'
import {
  Attachment,
  attachmentsState,
  useAttachmentCommand,
} from 'src/store/entities/attachments'

export const tasksAttachmentIdsSelector = selectorFamily<string[], string>({
  key: 'tasksAttachmentIdsSelector',
  get:
    (taskId) =>
    ({ get }) => {
      const attachments = get(attachmentsState)
      return attachments.filter((p) => p.taskId === taskId).map((p) => p.id)
    },
})
export const useTasksAttachmentIds = (taskId: string) => {
  const attachmentIds = useRecoilValue(tasksAttachmentIdsSelector(taskId))

  return {
    attachmentIds,
  }
}

export const useTasksAttachments = (taskId: string) => {
  const attachmentCommand = useAttachmentCommand()

  const addAttachment = useCallback(
    (val: Partial<Attachment>) => {
      return attachmentCommand.addAttachment({ ...val, taskId })
    },
    [attachmentCommand, taskId],
  )

  return {
    addAttachment,
  }
}
