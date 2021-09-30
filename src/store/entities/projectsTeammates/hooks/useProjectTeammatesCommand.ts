import { useRecoilCallback } from 'recoil'
import { projectTeammateSelector } from '../atom'
import { ProjectTeammate } from '../type'

export const useProjectTeammatesCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (projectTeammate: ProjectTeammate) => {
        set(projectTeammateSelector(projectTeammate.id), projectTeammate)
      },
    [],
  )

  const setProjectTeammateIdById = useRecoilCallback(
    ({ snapshot }) =>
      async (projectTeammateId: string, val: Partial<ProjectTeammate>) => {
        const prev = await snapshot.getPromise(
          projectTeammateSelector(projectTeammateId),
        )
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert],
  )

  return {
    setProjectTeammateIdById,
  }
}
