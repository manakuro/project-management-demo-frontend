import { useRecoilCallback } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { useTaskSection } from 'src/store/entities/taskSections'
import { useTasksCommand } from 'src/store/entities/tasks'
import { useMyTasksTaskIdsByTaskSection } from '../tasks'

export const useMyTaskByTaskSectionId = (taskSectionId: string) => {
  const { me } = useMe()
  const { addTask } = useTasksCommand()
  const { setSectionName, taskSection } = useTaskSection(taskSectionId)
  const { taskIds } = useMyTasksTaskIdsByTaskSection(taskSectionId)

  const addMyTask = useRecoilCallback(
    () => () => {
      return addTask({ assigneeId: me.id, taskSectionId })
    },
    [me.id, addTask, taskSectionId],
  )

  return {
    taskSection,
    taskIds,
    addTask: addMyTask,
    setSectionName,
  }
}
