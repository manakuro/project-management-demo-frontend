import { useRecoilValue } from 'recoil'
import { projectsTaskColumnState as state } from '../atom'

export const useProjectsTaskColumn = (projectTaskColumnId: string) => {
  const projectsTaskColumn = useRecoilValue(state(projectTaskColumnId))

  return {
    projectsTaskColumn,
  }
}
