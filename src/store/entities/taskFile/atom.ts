import { selectorFamily } from 'recoil'
import { FileTypeCode } from 'src/store/entities/fileTypes'
import { createState } from 'src/store/util'
import { TaskFile } from './type'

const key = (str: string) => `src/store/entities/taskFiles/${str}`

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
  state: taskFileState,
  listState: taskFilesState,
  idsState: taskFileIdsState,
} = createState({ key, initialState })

export const taskFileIdsByTaskIdState = selectorFamily<string[], string>({
  key: key('taskFileIdsByTaskIdState'),
  get:
    (taskId) =>
    ({ get }) => {
      const taskFiles = get(taskFilesState)
      return taskFiles.filter((p) => p.taskId === taskId).map((p) => p.id)
    },
})

export const taskFileIdsByFeedIdState = selectorFamily<string[], string>({
  key: key('taskFileIdsByFeedIdState'),
  get:
    (taskFeedId) =>
    ({ get }) => {
      const taskFiles = get(taskFilesState)
      return taskFiles
        .filter((p) => p.taskFeedId === taskFeedId)
        .map((p) => p.id)
    },
})
