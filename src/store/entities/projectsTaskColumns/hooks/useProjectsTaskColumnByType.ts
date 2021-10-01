import { useRecoilValue } from 'recoil'
import { TaskColumnType } from 'src/store/entities/taskColumns/types'
import { projectsTaskColumnByType } from '../atom'

export const useProjectsTaskColumnByType = ({
  type,
  projectId,
}: {
  type: TaskColumnType
  projectId: string
}) => {
  const projectsTaskColumn = useRecoilValue(
    projectsTaskColumnByType({ projectId, type }),
  )

  return {
    projectsTaskColumn,
  }
}
