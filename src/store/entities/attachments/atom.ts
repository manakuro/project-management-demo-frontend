import { selectorFamily } from 'recoil'
import { createState } from 'src/store/util'
import { Attachment } from './type'

const key = (str: string) => `src/store/entities/attachments/${str}`

export const initialState = (): Attachment => ({
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
export const {
  state: attachmentState,
  listState: attachmentsState,
  idsState: attachmentIdsState,
} = createState({ key, initialState })

export const attachmentIdsByTaskIdState = selectorFamily<string[], string>({
  key: key('attachmentIdsByTaskIdState'),
  get:
    (taskId) =>
    ({ get }) => {
      const attachments = get(attachmentsState)
      return attachments.filter((p) => p.taskId === taskId).map((p) => p.id)
    },
})

export const attachmentIdsByFeedIdState = selectorFamily<string[], string>({
  key: key('attachmentIdsByFeedIdState'),
  get:
    (feedId) =>
    ({ get }) => {
      const attachments = get(attachmentsState)
      return attachments.filter((p) => p.feedId === feedId).map((p) => p.id)
    },
})
