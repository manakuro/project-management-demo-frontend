import { useRecoilCallback } from 'recoil'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProjectTaskCommand } from 'src/store/entities/projectTask'
import { useTaskCommand } from 'src/store/entities/task'

export const useProjectsTask = () => {
  const { addProjectTask, setProjectTaskByTaskId } = useProjectTaskCommand()
  const { projectId } = useProjectsProjectId()
  const { setTaskSectionId: setTaskSectionIdCommand } = useTaskCommand()

  const addTask = useRecoilCallback(
    () => (val: { taskSectionId: string }) => {
      return addProjectTask({
        projectId,
        projectTaskSectionId: val.taskSectionId,
      })
    },
    [addProjectTask, projectId],
  )

  const setTaskSectionId = useRecoilCallback(
    () => async (val: { taskSectionId: string; taskId: string }) => {
      await setProjectTaskByTaskId(val.taskId, {
        projectTaskSectionId: val.taskSectionId,
      })
      await setTaskSectionIdCommand(val.taskId, val.taskSectionId)
    },
    [setProjectTaskByTaskId, setTaskSectionIdCommand],
  )

  return {
    addTask,
    setTaskSectionId,
  }
}
