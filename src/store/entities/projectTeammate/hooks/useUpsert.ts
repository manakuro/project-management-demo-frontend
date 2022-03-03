import { useRecoilCallback } from 'recoil'
import { projectTeammateState } from '../atom'
import { ProjectTeammate } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (projectTeammate: ProjectTeammate) => {
        set(projectTeammateState(projectTeammate.id), projectTeammate)
      },
    [],
  )

  return {
    upsert,
  }
}
