import { useRecoilCallback } from 'recoil'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import {
  projectTaskByTaskIdState,
  useProjectTaskCommand,
} from 'src/store/entities/projectTask'

export const useProjectSubTask = () => {
  const { addProjectTask } = useProjectTaskCommand()
  const { projectId } = useProjectsProjectId()

  const addTask = useRecoilCallback(
    ({ snapshot }) =>
      async (input: { taskParentId: string }) => {
        const projectTask = await snapshot.getPromise(
          projectTaskByTaskIdState(input.taskParentId),
        )
        return addProjectTask({
          projectId,
          projectTaskSectionId: projectTask.projectTaskSectionId,
          taskParentId: input.taskParentId,
        })
      },
    [addProjectTask, projectId],
  )

  return {
    addTask,
  }
}