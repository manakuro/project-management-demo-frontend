import { useRecoilCallback } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { projectTeammateState } from 'src/store/entities/projectsTeammates'
import { useTeammatesResponse } from 'src/store/entities/teammates'
import { projectState } from '../atom'
import { Project, ProjectResponse } from '../type'

export const useProjectsResponse = () => {
  const { setTeammates: setTeammatesFromResponse } = useTeammatesResponse()

  const setTeammates = useRecoilCallback(
    ({ set }) =>
      (data: ProjectResponse[]) => {
        const projectTeammates = data.reduce<ProjectResponse['teammates']>(
          (acc, p) => uniqBy([...acc, ...p.teammates], 'id'),
          [],
        )
        projectTeammates.forEach((t) => set(projectTeammateState(t.id), t))

        setTeammatesFromResponse(projectTeammates)
      },
    [setTeammatesFromResponse],
  )

  const setProjects = useRecoilCallback(
    ({ set }) =>
      (data: ProjectResponse[]) => {
        const projects: Project[] = data.map((d) => ({
          ...d,
          teammateIds: d.teammates.map((t) => t.id),
        }))

        projects.forEach((p) => {
          set(projectState(p.id), p)
        })

        setTeammates(data)
      },
    [setTeammates],
  )

  return {
    setProjects,
  }
}
