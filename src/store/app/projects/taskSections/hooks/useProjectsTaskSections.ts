import { useRecoilValue } from 'recoil'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { projectTaskSectionsByProjectIdState } from 'src/store/entities/projectTaskSection'

export const useProjectsTaskSections = () => {
  const { projectId } = useProjectsProjectId()
  const taskSections = useRecoilValue(
    projectTaskSectionsByProjectIdState(projectId),
  )

  return {
    taskSections,
  }
}
