import { useRecoilValue } from 'recoil'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { projectTaskSectionByTaskIdAndProjectIdState } from 'src/store/entities/projectTaskSection'

export const useProjectTaskSectionByTaskId = (taskId: string) => {
  const { projectId } = useProjectsProjectId()
  const taskSection = useRecoilValue(
    projectTaskSectionByTaskIdAndProjectIdState({
      taskId,
      projectId,
    }),
  )

  return {
    taskSection,
  }
}
