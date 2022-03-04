import { useRecoilCallback } from 'recoil'
import {
  useCreateTeammateTaskSectionMutation,
  useDeleteTeammateTaskSectionAndKeepTasksMutation,
  useDeleteTeammateTaskSectionAndDeleteTasksMutation,
  useDeleteTeammateTaskSectionMutation,
  useUndeleteTeammateTaskSectionAndKeepTasksMutation,
} from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { useMe } from 'src/store/entities/me'
import {
  teammateTaskByTeammateTaskSectionIdState,
  TeammateTaskResponse,
  teammateTasksByIdsState,
  useResetTeammateTask,
  useTeammateTaskResponse,
} from 'src/store/entities/teammateTask'
import { useWorkspace } from 'src/store/entities/workspace'
import { initialState, teammatesTaskSectionState } from '../atom'
import {
  DeleteTeammateTaskSectionAndKeepTasksMutation,
  TeammateTaskSection,
  TeammateTaskSectionResponse,
} from '../type'
import { useResetTeammateTaskSectionSection } from './useResetTeammateTaskSection'
import { TEAMMATE_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskSectionCreatedSubscription'
import { TEAMMATE_TASK_SECTION_DELETED_AND_DELETE_TASKS_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskSectionDeletedAndDeleteTasksSubscription'
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

  const [undeleteTeammateTaskSectionAndKeepTasksMutation] =
    useUndeleteTeammateTaskSectionAndKeepTasksMutation()

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

        const restore = () => {
          reset(teammatesTaskSectionState(id))
        }

        try {
          const res = await createTeammateTaskSectionMutation({
            variables: {
              input: {
                teammateId: me.id,
                workspaceId: workspace.id,
                requestId:
                  TEAMMATE_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          })
          if (res.errors) {
            restore()
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
        } catch (e) {
          restore()
          throw e
        }
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

        const restore = async () => {
          const prev = await snapshot.getPromise(teammatesTaskSectionState(id))
          setTeammateTask(teammateTasks as TeammateTaskResponse[])
          setTeammatesTaskSections([prev] as TeammateTaskSectionResponse[])
        }

        try {
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
            await restore()
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

          return res.data
        } catch (e) {
          await restore()
          throw e
        }
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
        const teammateTaskIds = teammateTasks.map((t) => t.id)

        resetTeammateTaskSection(id)
        resetTeammateTasks(teammateTaskIds)

        const restore = async () => {
          const prev = await snapshot.getPromise(teammatesTaskSectionState(id))
          setTeammateTask(teammateTasks as TeammateTaskResponse[])
          setTeammatesTaskSections([prev] as TeammateTaskSectionResponse[])
        }

        try {
          const res = await deleteTeammateTaskSectionAndDeleteTasksMutation({
            variables: {
              input: {
                id,
                workspaceId: workspace.id,
                requestId:
                  TEAMMATE_TASK_SECTION_DELETED_AND_DELETE_TASKS_SUBSCRIPTION_REQUEST_ID,
              },
            },
          })
          if (res.errors) {
            await restore()
          }
        } catch (e) {
          await restore()
          throw e
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

        const restore = async () => {
          const prev = await snapshot.getPromise(teammatesTaskSectionState(id))
          setTeammatesTaskSections([prev] as TeammateTaskSectionResponse[])
        }

        try {
          const res = await deleteTeammateTaskSectionMutation({
            variables: {
              input: {
                id,
                workspaceId: workspace.id,
                requestId:
                  TEAMMATE_TASK_SECTION_DELETED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          })
          if (res.errors) {
            await restore()
          }
        } catch (e) {
          await restore()
          throw e
        }
      },
    [
      deleteTeammateTaskSectionMutation,
      resetTeammateTaskSection,
      setTeammatesTaskSections,
      workspace.id,
    ],
  )

  const undeleteTaskSectionAndKeepTasks = useRecoilCallback(
    ({ snapshot }) =>
      async (val: DeleteTeammateTaskSectionAndKeepTasksMutation) => {
        const release = snapshot.retain()

        const teammateTaskSection =
          val.deleteTeammateTaskSectionAndKeepTasks.teammateTaskSection
        const teammateTaskIds =
          val.deleteTeammateTaskSectionAndKeepTasks.teammateTaskIds

        try {
          const res = await undeleteTeammateTaskSectionAndKeepTasksMutation({
            variables: {
              input: {
                name: teammateTaskSection.name,
                teammateId: teammateTaskSection.teammateId,
                workspaceId: teammateTaskSection.workspaceId,
                createdAt: teammateTaskSection.createdAt,
                updatedAt: teammateTaskSection.updatedAt,
                keptTeammateTaskIds: teammateTaskIds,
                requestId: '',
              },
            },
          })
          if (res.errors) {
            return
          }

          const data = res.data?.undeleteTeammateTaskSectionAndKeepTasks
          if (!data) return

          setTeammatesTaskSections([data.teammateTaskSection])

          const teammateTasks = await snapshot.getPromise(
            teammateTasksByIdsState(data.teammateTaskIds),
          )

          const newTeammateTasks = teammateTasks.map((t) => ({
            ...t,
            teammateTaskSectionId: data.teammateTaskSection.id,
          }))
          setTeammateTask(newTeammateTasks as TeammateTaskResponse[], {
            includeTask: false,
          })
        } finally {
          release()
        }
      },
    [
      setTeammateTask,
      setTeammatesTaskSections,
      undeleteTeammateTaskSectionAndKeepTasksMutation,
    ],
  )

  return {
    addTeammatesTaskSection,
    deleteTaskSectionAndKeepTasks,
    deleteTaskSectionAndDeleteTasks,
    deleteTeammateTaskSection,
    undeleteTaskSectionAndKeepTasks,
  }
}
