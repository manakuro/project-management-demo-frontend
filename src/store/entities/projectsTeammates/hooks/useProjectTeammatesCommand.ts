import { useRecoilCallback } from 'recoil'
import {
  projectTeammateSelector,
  projectTeammateByProjectIdAndTeammateIdSelector,
  ownerProjectTeammateByProjectIdSelector,
} from '../atom'
import { ProjectTeammate } from '../type'

export const useProjectTeammatesCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (projectTeammate: ProjectTeammate) => {
        set(projectTeammateSelector(projectTeammate.id), projectTeammate)
      },
    [],
  )

  const setProjectTeammateById = useRecoilCallback(
    ({ snapshot }) =>
      async (projectTeammateId: string, val: Partial<ProjectTeammate>) => {
        const current = await snapshot.getPromise(
          projectTeammateSelector(projectTeammateId),
        )
        upsert({
          ...current,
          ...val,
        })
      },
    [upsert],
  )

  const setProjectTeammateByProjectIdAndTeammateId = useRecoilCallback(
    ({ snapshot }) =>
      async (
        projectId: string,
        teammateId: string,
        val: Partial<ProjectTeammate>,
      ) => {
        const current = await snapshot.getPromise(
          projectTeammateByProjectIdAndTeammateIdSelector({
            projectId,
            teammateId,
          }),
        )
        upsert({
          ...current,
          ...val,
        })
      },
    [upsert],
  )

  const setOwnerByProjectIdAndTeammateId = useRecoilCallback(
    ({ snapshot }) =>
      async (projectId: string, teammateId: string) => {
        const currentOwner = await snapshot.getPromise(
          ownerProjectTeammateByProjectIdSelector(projectId),
        )
        upsert({
          ...currentOwner,
          isOwner: false,
        })

        const nextOwner = await snapshot.getPromise(
          projectTeammateByProjectIdAndTeammateIdSelector({
            projectId,
            teammateId,
          }),
        )
        upsert({
          ...nextOwner,
          isOwner: true,
        })
      },
    [upsert],
  )

  return {
    setProjectTeammateById,
    setProjectTeammateByProjectIdAndTeammateId,
    setOwnerByProjectIdAndTeammateId,
  }
}
