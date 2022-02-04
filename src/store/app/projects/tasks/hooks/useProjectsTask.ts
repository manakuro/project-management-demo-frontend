import { useRecoilCallback } from 'recoil'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProjectTaskCommand } from 'src/store/entities/projectTask'

export const useProjectsTask = () => {
  const { addProjectTask: addTask } = useProjectTaskCommand()
  const { projectId } = useProjectsProjectId()

  const addProjectTask = useRecoilCallback(
    () => (val: { taskSectionId: string }) => {
      return addTask({
        projectId,
        projectTaskSectionId: val.taskSectionId,
      })
    },
    [addTask, projectId],
  )

  return {
    addTask: addProjectTask,
  }
}
