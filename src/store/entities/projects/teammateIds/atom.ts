import { selectorFamily, useRecoilValue } from 'recoil'
import { projectTeammatesState } from 'src/store/entities/projectTeammates'

export const projectsTeammateIdsSelector = selectorFamily<string[], string>({
  key: 'projectsTeammateIdsSelector',
  get:
    (projectId) =>
    ({ get }) => {
      const projects = get(projectTeammatesState)
      return projects
        .filter((t) => t.projectId === projectId)
        .map((p) => p.teammateId)
    },
})
export const useProjectsTeammateIds = (projectId: string) => {
  const teammateIds = useRecoilValue(projectsTeammateIdsSelector(projectId))

  return {
    teammateIds,
  }
}
