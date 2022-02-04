import { selectorFamily } from 'recoil'
import { taskIdsByAssigneeIdState } from 'src/store/entities/task'
import { taskFilesState } from 'src/store/entities/taskFile'

const key = (str: string) => `src/store/app/myTasks/taskFiles/${str}`

export const taskFileIdsState = selectorFamily<string[], string>({
  key: key('taskFileIdsState'),
  get:
    (teammateId: string) =>
    ({ get }) => {
      const taskFiles = get(taskFilesState)
      const taskIds = get(taskIdsByAssigneeIdState(teammateId))
      return taskFiles
        .filter((a) => taskIds.includes(a.taskId))
        .map((a) => a.id)
    },
})
