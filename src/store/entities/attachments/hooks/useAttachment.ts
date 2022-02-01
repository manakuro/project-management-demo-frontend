import { useRecoilCallback, useRecoilValue } from 'recoil'
import { TaskFile, attachmentState } from 'src/store/entities/attachments'
import { useAttachmentCommand } from './useAttachmentCommand'

export const useAttachment = (attachmentId?: string) => {
  const attachment = useRecoilValue(attachmentState(attachmentId || ''))
  const { upsert } = useAttachmentCommand()

  const setAttachment = useRecoilCallback(
    ({ snapshot }) =>
      async (val: DeepPartial<TaskFile>) => {
        const prev = await snapshot.getPromise(attachmentState(attachment.id))
        upsert({
          ...prev,
          ...val,
          fileType: {
            ...prev.fileType,
            ...val.fileType,
          },
        })
      },
    [upsert, attachment.id],
  )

  return {
    attachment,
    setAttachment,
  }
}
