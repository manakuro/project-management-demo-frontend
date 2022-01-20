import { useRecoilValue } from 'recoil'
import { projectState } from '../atom'

export const useProject = (projectId: string) => {
  const project = useRecoilValue(projectState(projectId))

  return {
    project,
  }
}
