import { useRecoilCallback } from 'recoil'
import {
  useCreateTaskCollaboratorMutation,
  useDeleteTaskCollaboratorMutation,
} from 'src/graphql/hooks'
import { TaskCollaboratorResponse } from 'src/graphql/types/taskCollaborator'
import { uuid } from 'src/shared/uuid'
import {
  Teammate,
  useResetTeammate,
  useTeammateResponse,
} from 'src/store/entities/teammate'
import { useWorkspace } from 'src/store/entities/workspace'
import { initialState, taskCollaboratorByTaskIdAndTeammateId } from '../atom'
import { useResetTaskCollaborator } from './useResetTaskCollaborator'
import { TASK_COLLABORATOR_CREATED_SUBSCRIPTION_REQUEST_ID } from './useTaskCollaboratorCreatedSubscription'
import { useTaskCollaboratorResponse } from './useTaskCollaboratorResponse'
import { useUpsert } from './useUpsert'

export const useTaskCollaboratorCommand = () => {
  const { upsert } = useUpsert()
  const { resetTaskCollaborator } = useResetTaskCollaborator()
  const { setTaskCollaborators } = useTaskCollaboratorResponse()
  const { setTeammates } = useTeammateResponse()
  const { resetTeammate } = useResetTeammate()
  const { workspace } = useWorkspace()

  const [createTaskCollaboratorMutation] = useCreateTaskCollaboratorMutation()
  const [deleteTaskCollaboratorMutation] = useDeleteTaskCollaboratorMutation()

  const addTaskCollaboratorByTeammate = useRecoilCallback(
    ({ snapshot }) =>
      async (input: { taskId: string; teammate: Teammate }) => {
        const taskCollaborator = await snapshot.getPromise(
          taskCollaboratorByTaskIdAndTeammateId({
            teammateId: input.teammate.id,
            taskId: input.taskId,
          }),
        )
        if (taskCollaborator.id) return

        const id = uuid()
        upsert({
          ...initialState(),
          id,
          taskId: input.taskId,
          teammateId: input.teammate.id,
        })

        setTeammates([input.teammate])

        const restore = () => {
          resetTaskCollaborator(id)
          resetTeammate(input.teammate.id)
        }

        try {
          const res = await createTaskCollaboratorMutation({
            variables: {
              input: {
                taskId: input.taskId,
                teammateId: input.teammate.id,
                workspaceId: workspace.id,
                requestId: TASK_COLLABORATOR_CREATED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          })
          if (res.errors) {
            restore()
            return
          }

          const data = res.data?.createTaskCollaborator
          if (!data) return

          resetTaskCollaborator(id)
          setTaskCollaborators([data])
        } catch (e) {
          restore()
          throw e
        }
      },
    [
      createTaskCollaboratorMutation,
      resetTaskCollaborator,
      resetTeammate,
      setTaskCollaborators,
      setTeammates,
      upsert,
      workspace.id,
    ],
  )

  const deleteTaskCollaboratorByTeammate = useRecoilCallback(
    ({ snapshot }) =>
      async (input: { taskId: string; teammateId: string }) => {
        const taskCollaborator = await snapshot.getPromise(
          taskCollaboratorByTaskIdAndTeammateId({
            taskId: input.taskId,
            teammateId: input.teammateId,
          }),
        )

        resetTaskCollaborator(taskCollaborator.id)

        const restore = () => {
          setTaskCollaborators([taskCollaborator as TaskCollaboratorResponse])
        }

        try {
          const res = await deleteTaskCollaboratorMutation({
            variables: {
              input: {
                id: taskCollaborator.id,
                workspaceId: workspace.id,
                requestId: '',
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
    [
      deleteTaskCollaboratorMutation,
      resetTaskCollaborator,
      setTaskCollaborators,
      workspace.id,
    ],
  )

  return {
    addTaskCollaboratorByTeammate,
    deleteTaskCollaboratorByTeammate,
  }
}
