import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
} from 'recoil'
import { Attachment } from './type'
import { uniqBy } from 'src/shared/utils'
import { useCallback, useMemo } from 'react'
import { uuid } from 'src/shared/uuid'
import { ATTACHMENT_STATUS_ATTACHED } from 'src/store/entities/attachments/types'

export const attachmentIdsState = atom<string[]>({
  key: 'attachmentIdsState',
  default: [],
})
export const attachmentIdsGroupByTaskState = atomFamily<string[], string>({
  key: 'attachmentIdsGroupByTaskState',
  default: [],
})
export const attachmentsState = atom<Attachment[]>({
  key: 'attachmentsState',
  default: [],
})

const defaultStateValue = (): Attachment => ({
  id: '',
  taskId: '',
  name: '',
  src: '',
  createdAt: '',
  type: 1,
  status: 2,
})
const attachmentState = atomFamily<Attachment, string>({
  key: 'attachmentState',
  default: defaultStateValue(),
})

export const attachmentSelector = selectorFamily<Attachment, string>({
  key: 'attachmentSelector',
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

export const useAttachmentsByTask = (taskId: string) => {
  const attachmentIdsGroupByTask = useRecoilValue(
    attachmentIdsGroupByTaskState(taskId),
  )
  const { upsertAttachment } = useAttachment()

  const attachmentIds = useMemo(() => {
    return attachmentIdsGroupByTask || []
  }, [attachmentIdsGroupByTask])

  const addAttachment = useCallback(
    (val: Partial<Attachment>) => {
      const id = uuid()
      upsertAttachment({
        ...defaultStateValue(),
        ...val,
        id,
        taskId,
      })
      return id
    },
    [taskId, upsertAttachment],
  )

  return {
    attachmentIds,
    addAttachment,
  }
}

export const useAttachments = () => {
  const attachmentIds = useRecoilValue(attachmentIdsState)
  const attachments = useRecoilValue(attachmentsState)

  const setAttachments = useRecoilCallback(
    ({ set }) =>
      (attachments: Attachment[]) => {
        attachments.forEach((p) => {
          set(attachmentSelector(p.id), p)
        })
      },
    [],
  )

  return {
    attachmentIds,
    attachments,
    setAttachments,
  }
}

export const useAttachment = (attachmentId?: string) => {
  const attachment = useRecoilValue(attachmentSelector(attachmentId || ''))

  const upsertAttachment = useRecoilCallback(
    ({ set }) =>
      (attachment: Attachment) => {
        set(attachmentSelector(attachment.id), attachment)
      },
    [],
  )

  const setAttachment = useRecoilCallback(
    ({ snapshot }) =>
      async (val: DeepPartial<Attachment>) => {
        const prev = await snapshot.getPromise(
          attachmentSelector(attachment.id),
        )
        upsertAttachment({
          ...prev,
          ...val,
        })
      },
    [upsertAttachment, attachment.id],
  )

  return {
    attachment,
    upsertAttachment,
    setAttachment,
  }
}
