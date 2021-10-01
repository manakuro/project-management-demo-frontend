import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { attachmentState, initialState } from '../atom'
import { Attachment } from '../type'

export const useAttachmentCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (attachment: Attachment) => {
        set(attachmentState(attachment.id), attachment)
      },
    [],
  )

  const addAttachment = useCallback(
    (val: Partial<Attachment>) => {
      const id = uuid()
      upsert({
        ...initialState(),
        ...val,
        id,
      })
      return id
    },
    [upsert],
  )

  return {
    addAttachment,
    upsert,
  }
}
