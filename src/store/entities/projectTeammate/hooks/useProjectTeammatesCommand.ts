import { useRecoilCallback } from 'recoil'
import {
  useUpdateProjectTeammateOwnerMutation,
  useUpdateProjectTeammateMutation,
} from 'src/graphql/hooks'
import { useWorkspace } from 'src/store/entities/workspace'
import {
  projectTeammateState,
  projectTeammateByProjectIdAndTeammateIdState,
  ownerProjectTeammateByProjectIdState,
} from '../atom'
import { ProjectTeammate } from '../type'
import { useUpsert } from './useUpsert'

export const useProjectTeammatesCommand = () => {
  const { upsert } = useUpsert()
  const [updateProjectTeammateOwnerMutation] =
    useUpdateProjectTeammateOwnerMutation()

  const [updateProjectTeammateMutation] = useUpdateProjectTeammateMutation()

  const { workspace } = useWorkspace()

  const setProjectTeammateById = useRecoilCallback(
    ({ snapshot }) =>
      async (input: Partial<ProjectTeammate> & { id: string }) => {
        const prev = await snapshot.getPromise(projectTeammateState(input.id))

        const restore = () => {
          upsert(prev)
        }

        upsert({
          ...prev,
          ...input,
        })

        try {
          const res = await updateProjectTeammateMutation({
            variables: {
              input: {
                ...input,
                requestId: '',
                workspaceId: workspace.id,
              },
            },
          })
          if (res.errors) {
            restore()
          }
        } catch (e) {
          restore()
          throw e
        }
      },
    [updateProjectTeammateMutation, upsert, workspace.id],
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
        const prev = await snapshot.getPromise(
          ownerProjectTeammateByProjectIdState(projectId),
        )
        upsert({ ...prev, isOwner: false })

        const restore = () => {
          upsert({ ...prev, isOwner: true })
        }

        const owner = await snapshot.getPromise(
          projectTeammateByProjectIdAndTeammateIdState({
            projectId,
            teammateId,
          }),
        )
        upsert({
          ...owner,
          isOwner: true,
        })

        try {
          const res = await updateProjectTeammateOwnerMutation({
            variables: {
              input: {
                id: owner.id,
                projectId,
                requestId: '',
                workspaceId: workspace.id,
              },
            },
          })
          if (res.errors) {
            restore()
          }
        } catch (e) {
          restore()
          throw e
        }
      },
    [updateProjectTeammateOwnerMutation, upsert, workspace.id],
  )

  return {
    setProjectTeammateById,
    setProjectTeammateByProjectIdAndTeammateId,
    setOwnerByProjectIdAndTeammateId,
  }
}
