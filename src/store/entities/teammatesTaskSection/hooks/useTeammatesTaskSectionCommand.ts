import { useRecoilCallback } from 'recoil'
import {
  useCreateTeammateTaskSectionMutation,
  useDeleteTeammateTaskSectionAndKeepTasksMutation,
} from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { useMe } from 'src/store/entities/me'
import {
  teammateTaskByTeammateTaskSectionIdState,
  TeammateTaskResponse,
  useTeammateTaskResponse,
} from 'src/store/entities/teammateTask'
import { useWorkspace } from 'src/store/entities/workspace'
import {
  assignedTeammateTaskSectionState,
  initialState,
  teammatesTaskSectionState,
} from '../atom'
import { TeammateTaskSection, TeammateTaskSectionResponse } from '../type'
import { TEAMMATE_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskSectionCreatedSubscription'
import { useTeammatesTaskSectionResponse } from './useTeammatesTaskSectionResponse'
import { useUpsert } from './useUpsert'

export const useTeammatesTaskSectionCommand = () => {
  const { upsert } = useUpsert()
  const { me } = useMe()
  const { workspace } = useWorkspace()
  const [createTeammateTaskSectionMutation] =
    useCreateTeammateTaskSectionMutation()
  const { setTeammatesTaskSections } = useTeammatesTaskSectionResponse()
  const [deleteTeammateTaskSectionAndKeepTasksMutation] =
    useDeleteTeammateTaskSectionAndKeepTasksMutation()
  const { setTeammateTask } = useTeammateTaskResponse()

  const addTeammatesTaskSection = useRecoilCallback(
    ({ reset }) =>
      async (val?: Partial<TeammateTaskSection>) => {
        const id = uuid()
        upsert({
          ...initialState(),
          ...val,
          isNew: true,
          id,
        })

        const res = await createTeammateTaskSectionMutation({
          variables: {
            input: {
              teammateId: me.id,
              workspaceId: workspace.id,
              requestId: TEAMMATE_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID,
            },
          },
        })
        if (res.errors) {
          reset(teammatesTaskSectionState(id))
          return ''
        }

        const addedTeammateTaskSection = res.data?.createTeammateTaskSection
        if (!addedTeammateTaskSection) return ''

        reset(teammatesTaskSectionState(id))
        setTeammatesTaskSections([
          {
            ...addedTeammateTaskSection,
            isNew: true,
          },
        ])

        return addedTeammateTaskSection.id
      },
    [
      createTeammateTaskSectionMutation,
      me.id,
      setTeammatesTaskSections,
      upsert,
      workspace.id,
    ],
  )

  const deleteTaskSectionAndKeepTask = useRecoilCallback(
    ({ reset, snapshot }) =>
      async (id: string) => {
        const teammateTasks = await snapshot.getPromise(
          teammateTaskByTeammateTaskSectionIdState(id),
        )
        const teammateTaskSection = await snapshot.getPromise(
          assignedTeammateTaskSectionState,
        )
        const newTeammateTasks = teammateTasks.map((t) => ({
          ...t,
          teammateTaskSectionId: teammateTaskSection.id,
        }))
        setTeammateTask(newTeammateTasks as TeammateTaskResponse[])

        reset(teammatesTaskSectionState(id))

        const res = await deleteTeammateTaskSectionAndKeepTasksMutation({
          variables: {
            input: {
              id,
              requestId: 'requestId',
            },
          },
        })
        if (res.errors) {
          const prev = await snapshot.getPromise(teammatesTaskSectionState(id))
          setTeammateTask(teammateTasks as TeammateTaskResponse[])
          setTeammatesTaskSections([prev] as TeammateTaskSectionResponse[])
          return
        }
      },
    [
      deleteTeammateTaskSectionAndKeepTasksMutation,
      setTeammateTask,
      setTeammatesTaskSections,
    ],
  )

  return {
    addTeammatesTaskSection,
    deleteTaskSectionAndKeepTask,
  }
}
