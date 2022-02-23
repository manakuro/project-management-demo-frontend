import { useRecoilCallback } from 'recoil'
import {
  useCreateTeammateTaskMutation,
  useDeleteTeammateTaskMutation,
} from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { useMe } from 'src/store/entities/me'
import { taskState, useTaskCommand } from 'src/store/entities/task'
import { useWorkspace } from 'src/store/entities/workspace'
import {
  teammateTaskState,
  initialState,
  teammateTaskByTaskIdState,
} from '../atom'
import { TeammateTask, TeammateTaskResponse } from '../type'
import {
  TEAMMATE_TASK_CREATED_SUBSCRIPTION_REQUEST_ID,
  useTeammateTaskCreatedSubscription,
} from './useTeammateTaskCreatedSubscription'
import { useTeammateTaskResponse } from './useTeammateTaskResponse'

export const useTeammateTaskCommand = () => {
  const { me } = useMe()
  const { workspace } = useWorkspace()
  const { addTask } = useTaskCommand()
  const [createTeammateTaskMutation] = useCreateTeammateTaskMutation()
  const [deleteTeammateTaskMutation] = useDeleteTeammateTaskMutation()
  const { setTeammateTask } = useTeammateTaskResponse()

  useTeammateTaskCreatedSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  })

  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: TeammateTask) => {
        set(teammateTaskState(val.id), val)
      },
    [],
  )

  const setTeammateTaskById = useRecoilCallback(
    ({ snapshot }) =>
      async (taskId: string, val: Partial<TeammateTask>) => {
        const prev = await snapshot.getPromise(teammateTaskState(taskId))
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert],
  )

  const addTeammateTask = useRecoilCallback(
    ({ reset }) =>
      async (
        val: Partial<TeammateTask> & { teammateTaskSectionId: string },
      ) => {
        const id = uuid()
        const newTaskId = addTask({
          assigneeId: me.id,
          taskSectionId: val.teammateTaskSectionId,
        })
        const newTeammateTask = {
          ...initialState(),
          ...val,
          id,
          taskId: newTaskId,
          teammateId: me.id,
        }
        upsert(newTeammateTask)

        const res = await createTeammateTaskMutation({
          variables: {
            input: {
              teammateId: me.id,
              teammateTaskSectionId: val.teammateTaskSectionId,
              workspaceId: workspace.id,
              requestId: TEAMMATE_TASK_CREATED_SUBSCRIPTION_REQUEST_ID,
            },
          },
        })
        if (res.errors) {
          reset(teammateTaskState(id))
          reset(taskState(newTaskId))
          return ''
        }

        const data = res.data?.createTeammateTask
        if (!data) return ''

        reset(teammateTaskState(id))
        reset(taskState(newTaskId))
        setTeammateTask([data])

        return data.id
      },
    [
      addTask,
      createTeammateTaskMutation,
      me.id,
      setTeammateTask,
      upsert,
      workspace.id,
    ],
  )

  const deleteTeammateTask = useRecoilCallback(
    ({ snapshot, reset }) =>
      async (val: { taskId: string }) => {
        const teammateTask = await snapshot.getPromise(
          teammateTaskByTaskIdState(val.taskId),
        )
        if (!teammateTask.id) return ''

        reset(teammateTaskState(teammateTask.id))

        const res = await deleteTeammateTaskMutation({
          variables: {
            input: {
              id: teammateTask.id,
              taskId: teammateTask.taskId,
              workspaceId: teammateTask.workspaceId,
              teammateId: teammateTask.teammateId,
              requestId: 'requestId',
            },
          },
        })
        if (res.errors) {
          setTeammateTask([teammateTask as TeammateTaskResponse])
          return
        }

        return teammateTask.id
      },
  )

  return {
    addTeammateTask,
    setTeammateTaskById,
    deleteTeammateTask,
  }
}
