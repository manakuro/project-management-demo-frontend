import { useRecoilCallback } from 'recoil'
import {
  useCreateTeammateTaskMutation,
  useUpdateTeammateTaskMutation,
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
import { TeammateTask } from '../type'
import { TEAMMATE_TASK_CREATED_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskCreatedSubscription'
import { useTeammateTaskResponse } from './useTeammateTaskResponse'
import { TEAMMATE_TASK_UPDATED_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskUpdatedSubscription'
import { useUpsert } from './useUpsert'

export const useTeammateTaskCommand = () => {
  const { me } = useMe()
  const { workspace } = useWorkspace()
  const { addTask } = useTaskCommand()
  const [createTeammateTaskMutation] = useCreateTeammateTaskMutation()
  const [updateTeammateTaskMutation] = useUpdateTeammateTaskMutation()
  const { setTeammateTask } = useTeammateTaskResponse()
  const { upsert } = useUpsert()

  const setTeammateTaskByTaskId = useRecoilCallback(
    ({ snapshot }) =>
      async (taskId: string, val: Partial<TeammateTask>) => {
        const prev = await snapshot.getPromise(
          teammateTaskByTaskIdState(taskId),
        )
        upsert({ ...prev, ...val })

        const res = await updateTeammateTaskMutation({
          variables: {
            input: {
              ...val,
              id: prev.id,
              workspaceId: prev.workspaceId,
              requestId: TEAMMATE_TASK_UPDATED_SUBSCRIPTION_REQUEST_ID,
            },
          },
        })
        if (res.errors) {
          upsert(prev)
          return
        }
      },
    [updateTeammateTaskMutation, upsert],
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

  return {
    addTeammateTask,
    setTeammateTaskByTaskId,
  }
}
