import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
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

export const defaultStateValue = (): Attachment => ({
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
