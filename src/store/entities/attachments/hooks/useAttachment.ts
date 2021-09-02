import { useRecoilCallback, useRecoilValue } from 'recoil'
import { Attachment, attachmentSelector } from 'src/store/entities/attachments'
import { useAttachmentCommand } from './useAttachmentCommand'

export const useAttachment = (attachmentId?: string) => {
  const attachment = useRecoilValue(attachmentSelector(attachmentId || ''))
  const { upsert } = useAttachmentCommand()

  const setAttachment = useRecoilCallback(
    ({ snapshot }) =>
      async (val: DeepPartial<Attachment>) => {
        const prev = await snapshot.getPromise(
          attachmentSelector(attachment.id),
        )
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert, attachment.id],
  )

  return {
    attachment,
    setAttachment,
  }
}
