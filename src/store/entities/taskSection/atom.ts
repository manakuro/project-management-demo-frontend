import { selectorFamily } from 'recoil'
import { projectTaskByTaskIdState } from 'src/store/entities/projectTask'
import { teammateTaskByTaskIdState } from 'src/store/entities/teammateTask'

const key = (str: string) => `src/store/entities/taskSection/${str}`

export const taskSectionIdByTaskIdState = selectorFamily<string, string>({
  key: key('taskSectionIdByTaskIdState'),
  get:
    (taskId) =>
    ({ get }) => {
      const teammateTask = get(teammateTaskByTaskIdState(taskId))
      const projectTask = get(projectTaskByTaskIdState(taskId))

      return (
        teammateTask.teammateTaskSectionId || projectTask.projectTaskSectionId
      )
    },
})
