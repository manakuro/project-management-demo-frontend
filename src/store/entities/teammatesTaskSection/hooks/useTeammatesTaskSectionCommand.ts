import { useRecoilCallback } from 'recoil'
import {
  useCreateTeammateTaskSectionMutation,
  useDeleteTeammateTaskSectionAndKeepTasksMutation,
  useDeleteTeammateTaskSectionAndDeleteTasksMutation,
  useDeleteTeammateTaskSectionMutation,
} from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { useMe } from 'src/store/entities/me'
import {
  teammateTaskByTeammateTaskSectionIdState,
  TeammateTaskResponse,
  useResetTeammateTask,
  useTeammateTaskResponse,
} from 'src/store/entities/teammateTask'
import { useWorkspace } from 'src/store/entities/workspace'
import { initialState, teammatesTaskSectionState } from '../atom'
import { TeammateTaskSection, TeammateTaskSectionResponse } from '../type'
import { useResetTeammateTaskSectionSection } from './useResetTeammateTaskSection'
import { TEAMMATE_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskSectionCreatedSubscription'
import { TEAMMATE_TASK_SECTION_DELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskSectionDeletedAndKeepTasksSubscription'
import { TEAMMATE_TASK_SECTION_DELETED_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskSectionDeletedSubscription'
import { useTeammatesTaskSectionResponse } from './useTeammatesTaskSectionResponse'
import { useUpsert } from './useUpsert'

export const useTeammatesTaskSectionCommand = () => {
  const { upsert } = useUpsert()
  const { me } = useMe()
  const { workspace } = useWorkspace()
  const [createTeammateTaskSectionMutation] =
    useCreateTeammateTaskSectionMutation()
  const { setTeammatesTaskSections } = useTeammatesTaskSectionResponse()
  const { resetTeammateTaskSection } = useResetTeammateTaskSectionSection()

  const [deleteTeammateTaskSectionAndKeepTasksMutation] =
    useDeleteTeammateTaskSectionAndKeepTasksMutation()

  const [deleteTeammateTaskSectionAndDeleteTasksMutation] =
    useDeleteTeammateTaskSectionAndDeleteTasksMutation()

  const [deleteTeammateTaskSectionMutation] =
    useDeleteTeammateTaskSectionMutation()

  const { setTeammateTask } = useTeammateTaskResponse()
  const { resetTeammateTasks } = useResetTeammateTask()

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

  const deleteTaskSectionAndKeepTasks = useRecoilCallback(
    ({ snapshot }) =>
      async (id: string) => {
        const teammateTasks = await snapshot.getPromise(
          teammateTaskByTeammateTaskSectionIdState(id),
        )

        resetTeammateTaskSection(id)

        const res = await deleteTeammateTaskSectionAndKeepTasksMutation({
          variables: {
            input: {
              id,
              workspaceId: workspace.id,
              requestId:
                TEAMMATE_TASK_SECTION_DELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID,
            },
          },
        })
        if (res.errors) {
          const prev = await snapshot.getPromise(teammatesTaskSectionState(id))
          setTeammateTask(teammateTasks as TeammateTaskResponse[])
          setTeammatesTaskSections([prev] as TeammateTaskSectionResponse[])
          return
        }

        const teammateTaskSection =
          res.data?.deleteTeammateTaskSectionAndKeepTasks
            .keptTeammateTaskSection
        if (!teammateTaskSection) return

        const newTeammateTasks = teammateTasks.map((t) => ({
          ...t,
          teammateTaskSectionId: teammateTaskSection.id,
        }))
        setTeammateTask(newTeammateTasks as TeammateTaskResponse[], {
          includeTask: false,
        })
      },
    [
      deleteTeammateTaskSectionAndKeepTasksMutation,
      resetTeammateTaskSection,
      setTeammateTask,
      setTeammatesTaskSections,
      workspace.id,
    ],
  )

  const deleteTaskSectionAndDeleteTasks = useRecoilCallback(
    ({ snapshot }) =>
      async (id: string) => {
        const teammateTasks = await snapshot.getPromise(
          teammateTaskByTeammateTaskSectionIdState(id),
        )

        resetTeammateTaskSection(id)
        resetTeammateTasks(teammateTasks)

        const res = await deleteTeammateTaskSectionAndDeleteTasksMutation({
          variables: {
            input: {
              id,
              workspaceId: workspace.id,
              requestId: 'requestId',
            },
          },
        })
        if (res.errors) {
          const prev = await snapshot.getPromise(teammatesTaskSectionState(id))
          setTeammateTask(teammateTasks as TeammateTaskResponse[])
          setTeammatesTaskSections([prev] as TeammateTaskSectionResponse[])
        }
      },
    [
      deleteTeammateTaskSectionAndDeleteTasksMutation,
      resetTeammateTaskSection,
      resetTeammateTasks,
      setTeammateTask,
      setTeammatesTaskSections,
      workspace.id,
    ],
  )

  const deleteTeammateTaskSection = useRecoilCallback(
    ({ snapshot }) =>
      async (id: string) => {
        resetTeammateTaskSection(id)

        const res = await deleteTeammateTaskSectionMutation({
          variables: {
            input: {
              id,
              workspaceId: workspace.id,
              requestId: TEAMMATE_TASK_SECTION_DELETED_SUBSCRIPTION_REQUEST_ID,
            },
          },
        })
        if (res.errors) {
          const prev = await snapshot.getPromise(teammatesTaskSectionState(id))
          setTeammatesTaskSections([prev] as TeammateTaskSectionResponse[])
        }
      },
    [
      deleteTeammateTaskSectionMutation,
      resetTeammateTaskSection,
      setTeammatesTaskSections,
      workspace.id,
    ],
  )

  return {
    addTeammatesTaskSection,
    deleteTaskSectionAndKeepTasks,
    deleteTaskSectionAndDeleteTasks,
    deleteTeammateTaskSection,
  }
}
