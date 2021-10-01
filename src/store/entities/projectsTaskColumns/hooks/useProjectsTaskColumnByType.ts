import { useRecoilValue } from 'recoil'
import { TaskColumnType } from 'src/store/entities/taskColumns/types'
import { projectsTaskColumnByTypeState } from '../atom'

export const useProjectsTaskColumnByType = ({
  type,
  projectId,
}: {
  type: TaskColumnType
  projectId: string
}) => {
  const projectsTaskColumn = useRecoilValue(
    projectsTaskColumnByTypeState({ projectId, type }),
  )

  return {
    projectsTaskColumn,
  }
}
