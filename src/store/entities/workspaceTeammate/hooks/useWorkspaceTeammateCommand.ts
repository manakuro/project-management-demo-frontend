import { useRecoilCallback } from 'recoil'
import {
  workspaceTeammateState,
  workspaceTeammateByWorkspaceIdAndTeammateIdState,
  ownerWorkspaceTeammateByWorkspaceIdState,
} from '../atom'
import { WorkspaceTeammate } from '../type'
import { useUpsert } from './useUpsert'

export const useWorkspaceTeammateCommand = () => {
  const { upsert } = useUpsert()

  const setWorkspaceTeammateById = useRecoilCallback(
    ({ snapshot }) =>
      async (
        workspaceTeammateId: string,
        input: Partial<WorkspaceTeammate>,
      ) => {
        const current = await snapshot.getPromise(
          workspaceTeammateState(workspaceTeammateId),
        )
        upsert({
          ...current,
          ...input,
        })
      },
    [upsert],
  )

  const setWorkspaceTeammateByWorkspaceIdAndTeammateId = useRecoilCallback(
    ({ snapshot }) =>
      async (
        workspaceId: string,
        teammateId: string,
        input: Partial<WorkspaceTeammate>,
      ) => {
        const current = await snapshot.getPromise(
          workspaceTeammateByWorkspaceIdAndTeammateIdState({
            workspaceId,
            teammateId,
          }),
        )
        upsert({
          ...current,
          ...input,
        })
      },
    [upsert],
  )

  const setOwnerByWorkspaceIdAndTeammateId = useRecoilCallback(
    ({ snapshot }) =>
      async (workspaceId: string, teammateId: string) => {
        const currentOwner = await snapshot.getPromise(
          ownerWorkspaceTeammateByWorkspaceIdState(workspaceId),
        )
        upsert({
          ...currentOwner,
          isOwner: false,
        })

        const nextOwner = await snapshot.getPromise(
          workspaceTeammateByWorkspaceIdAndTeammateIdState({
            workspaceId,
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
    setWorkspaceTeammateById,
    setWorkspaceTeammateByWorkspaceIdAndTeammateId,
    setOwnerByWorkspaceIdAndTeammateId,
  }
}
