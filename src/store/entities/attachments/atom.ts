import { selectorFamily } from 'recoil'
import { FileTypeCode } from 'src/store/entities/fileTypes'
import { createState } from 'src/store/util'
import { TaskFile } from './type'

const key = (str: string) => `src/store/entities/attachments/${str}`

export const initialState = (): TaskFile => ({
  id: '',
  projectId: '',
  taskId: '',
  taskFeedId: '',
  name: '',
  src: '',
  fileTypeId: '',
  fileType: {
    id: '',
    name: '',
    typeCode: FileTypeCode.Image,
    createdAt: '',
    updatedAt: '',
  },
  attached: false,
  createdAt: '',
  updatedAt: '',
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
      return attachments.filter((p) => p.taskFeedId === feedId).map((p) => p.id)
    },
})
