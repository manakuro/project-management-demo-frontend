import { useRecoilCallback } from 'recoil'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProjectTaskCommand } from 'src/store/entities/projectTask'

export const useProjectsTask = () => {
  const { addProjectTask } = useProjectTaskCommand()
  const { projectId } = useProjectsProjectId()

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
    () => async (_: { taskSectionId: string; taskId: string }) => {},
    [],
  )

  return {
    addTask,
    setTaskSectionId,
  }
}
