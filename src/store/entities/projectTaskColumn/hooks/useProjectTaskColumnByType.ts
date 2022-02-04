import { useRecoilValue } from 'recoil'
import { TaskColumnTypeValue } from 'src/store/entities/taskColumn'
import { projectsTaskColumnByTypeState } from '../atom'

export const useProjectTaskColumnByType = ({
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
