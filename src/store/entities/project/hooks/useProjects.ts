import { useRecoilValue } from 'recoil'
import { projectsState } from '../atom'

export const useProjects = () => {
  const projects = useRecoilValue(projectsState)

  return {
    projects,
  }
}
