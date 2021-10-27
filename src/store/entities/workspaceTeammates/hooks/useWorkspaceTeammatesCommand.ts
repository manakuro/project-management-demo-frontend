import { useRecoilCallback } from 'recoil'
import {
  workspaceTeammateState,
  workspaceTeammateByWorkspaceIdAndTeammateIdState,
  ownerWorkspaceTeammateByWorkspaceIdState,
} from '../atom'
import { WorkspaceTeammate } from '../type'

export const useWorkspaceTeammatesCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (workspaceTeammate: WorkspaceTeammate) => {
        set(workspaceTeammateState(workspaceTeammate.id), workspaceTeammate)
      },
    [],
  )

  const setWorkspaceTeammateById = useRecoilCallback(
    ({ snapshot }) =>
      async (workspaceTeammateId: string, val: Partial<WorkspaceTeammate>) => {
        const current = await snapshot.getPromise(
          workspaceTeammateState(workspaceTeammateId),
        )
        upsert({
          ...current,
          ...val,
        })
      },
    [upsert],
  )

  const setWorkspaceTeammateByWorkspaceIdAndTeammateId = useRecoilCallback(
    ({ snapshot }) =>
      async (
        workspaceId: string,
        teammateId: string,
        val: Partial<WorkspaceTeammate>,
      ) => {
        const current = await snapshot.getPromise(
          workspaceTeammateByWorkspaceIdAndTeammateIdState({
            workspaceId,
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
