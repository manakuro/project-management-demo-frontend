import { useRecoilCallback } from 'recoil'
import {
  projectTeammateState,
  projectTeammateByProjectIdAndTeammateIdState,
  ownerProjectTeammateByProjectIdState,
} from '../atom'
import { ProjectTeammate } from '../type'
import { useUpsert } from './useUpsert'

export const useProjectTeammatesCommand = () => {
  const { upsert } = useUpsert()

  const setProjectTeammateById = useRecoilCallback(
    ({ snapshot }) =>
      async (projectTeammateId: string, input: Partial<ProjectTeammate>) => {
        const current = await snapshot.getPromise(
          projectTeammateState(projectTeammateId),
        )
        upsert({
          ...current,
          ...input,
        })
      },
    [upsert],
  )

  const setProjectTeammateByProjectIdAndTeammateId = useRecoilCallback(
    ({ snapshot }) =>
      async (
        projectId: string,
        teammateId: string,
        input: Partial<ProjectTeammate>,
      ) => {
        const prev = await snapshot.getPromise(
          projectTeammateByProjectIdAndTeammateIdState({
            projectId,
            teammateId,
          }),
        )
        upsert({
          ...prev,
          ...input,
        })
      },
    [upsert],
  )

  const setOwnerByProjectIdAndTeammateId = useRecoilCallback(
    ({ snapshot }) =>
      async (projectId: string, teammateId: string) => {
        const currentOwner = await snapshot.getPromise(
          ownerProjectTeammateByProjectIdState(projectId),
        )
        upsert({
          ...currentOwner,
          isOwner: false,
        })

        const nextOwner = await snapshot.getPromise(
          projectTeammateByProjectIdAndTeammateIdState({
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
