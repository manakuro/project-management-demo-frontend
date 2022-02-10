import { useRecoilValue } from 'recoil'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { taskSectionsState } from '../atom'

export const useProjectsTaskSections = () => {
  const { projectId } = useProjectsProjectId()
  const taskSections = useRecoilValue(taskSectionsState(projectId))

  return {
    taskSections,
  }
}
