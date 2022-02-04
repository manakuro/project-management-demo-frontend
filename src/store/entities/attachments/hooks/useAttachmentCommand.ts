import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { attachmentState, initialState } from '../atom'
import { TaskFile } from '../type'

export const useAttachmentCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (attachment: TaskFile) => {
        set(attachmentState(attachment.id), attachment)
      },
    [],
  )

  const addAttachment = useCallback(
    (val: Partial<TaskFile>) => {
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
