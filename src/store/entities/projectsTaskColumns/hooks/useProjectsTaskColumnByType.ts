import { useRecoilValue } from 'recoil'
import { TaskColumnTypeValue } from 'src/store/entities/taskColumns'
import { projectsTaskColumnByTypeState } from '../atom'

export const useProjectsTaskColumnByType = ({
  type,
  projectId,
}: {
  type: TaskColumnTypeValue
  projectId: string
}) => {
  const projectsTaskColumn = useRecoilValue(
    projectsTaskColumnByTypeState({ projectId, type }),
  )

  return {
    projectsTaskColumn,
  }
}
