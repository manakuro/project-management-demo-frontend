import { selectorFamily } from 'recoil'
import { attachmentsState } from 'src/store/entities/attachments'
import { taskIdsByProjectIdState } from 'src/store/entities/projectsTasks'

const key = (str: string) => `src/store/app/projectsFiles/${str}`

export const attachmentIdsState = selectorFamily<string[], string>({
  key: key('attachmentIdsState'),
  get:
    (projectId: string) =>
    ({ get }) => {
      const attachments = get(attachmentsState)
      const taskIds = get(taskIdsByProjectIdState(projectId))
      return attachments
        .filter((a) => taskIds.includes(a.taskId))
        .map((a) => a.id)
    },
})
