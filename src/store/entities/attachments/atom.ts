import { useCallback } from 'react'
import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
} from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { uuid } from 'src/shared/uuid'
import { ATTACHMENT_STATUS_ATTACHED } from 'src/store/entities/attachments/types'
import { Attachment } from './type'

const key = (str: string) => `src/store/entities/attachments/${str}`

export const attachmentIdsState = atom<string[]>({
  key: key('attachmentIdsState'),
  default: [],
})
export const attachmentIdsGroupByTaskState = atomFamily<string[], string>({
  key: key('attachmentIdsGroupByTaskState'),
  default: [],
})
export const attachmentsState = atom<Attachment[]>({
  key: key('attachmentsState'),
  default: [],
})

const defaultStateValue = (): Attachment => ({
  id: '',
  projectId: '',
  taskId: '',
  feedId: '',
  name: '',
  src: '',
  createdAt: '',
  type: 1,
  status: 2,
})
const attachmentState = atomFamily<Attachment, string>({
  key: key('attachmentState'),
  default: defaultStateValue(),
})

export const attachmentSelector = selectorFamily<Attachment, string>({
  key: key('attachmentSelector'),
  get:
    (attachmentId) =>
    ({ get }) =>
      get(attachmentState(attachmentId)),
  set:
    (attachmentId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(attachmentState(attachmentId))
        return
      }

      set(attachmentState(attachmentId), newVal)
      set(attachmentsState, (prev) =>
        uniqBy([...prev, newVal], 'id').map((p) => {
          if (p.id === newVal.id) {
            return {
              ...p,
              ...newVal,
            }
          }
          return p
        }),
      )

      if (
        get(attachmentIdsState).find(
          (attachmentId) => attachmentId === newVal.id,
        )
      )
        return

      set(attachmentIdsState, (prev) => [...prev, newVal.id])
      set(attachmentIdsGroupByTaskState(newVal.taskId), (prev) => [
        ...prev,
        ...(newVal.status === ATTACHMENT_STATUS_ATTACHED ? [newVal.id] : []),
      ])
    },
})

export const useAttachments = () => {
  const attachmentIds = useRecoilValue(attachmentIdsState)
  const attachments = useRecoilValue(attachmentsState)

  return {
    attachmentIds,
    attachments,
  }
}

export const useAttachmentCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (attachment: Attachment) => {
        set(attachmentSelector(attachment.id), attachment)
      },
    [],
  )

  const addAttachment = useCallback(
    (val: Partial<Attachment>) => {
      const id = uuid()
      upsert({
        ...defaultStateValue(),
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
