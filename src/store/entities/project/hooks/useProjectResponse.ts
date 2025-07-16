import { useRecoilCallback } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import {
  type ProjectTeammate,
  projectTeammateState,
} from 'src/store/entities/projectTeammate'
import { type Teammate, useTeammateResponse } from 'src/store/entities/teammate'
import { projectState } from '../atom'
import type { ProjectResponse } from '../type'

export const useProjectResponse = () => {
  const { setTeammates: setTeammatesFromResponse } = useTeammateResponse()

  const setProjectTeammates = useRecoilCallback(
    ({ set }) =>
      (data: ProjectResponse[]) => {
        const projectTeammates = data.reduce<ProjectTeammate[]>((acc, p) => {
          acc.push(...p.projectTeammates)
          return uniqBy(acc, 'id')
        }, [])

        projectTeammates.forEach((p) => set(projectTeammateState(p.id), p))
      },
  )

  const setTeammates = useRecoilCallback(
    () => (data: ProjectResponse[]) => {
      const teammates = data.reduce<Teammate[]>((acc, p) => {
        acc.push(...p.projectTeammates.map((pt) => pt.teammate))
        return uniqBy(acc, 'id')
      }, [])

      setTeammatesFromResponse(teammates)
    },
    [setTeammatesFromResponse],
  )

  const setProjects = useRecoilCallback(
    ({ set }) =>
      (data: ProjectResponse[]) => {
        data.forEach((p) => {
          set(projectState(p.id), p)
        })

        setProjectTeammates(data)
        setTeammates(data)
      },
    [setProjectTeammates, setTeammates],
  )

  return {
    setProjects,
  }
}
