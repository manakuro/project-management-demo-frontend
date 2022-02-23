import { useRecoilCallback } from 'recoil'
import { useCreateTeammateTaskMutation } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { useMe } from 'src/store/entities/me'
import { taskState, useTaskCommand } from 'src/store/entities/task'
import { useWorkspace } from 'src/store/entities/workspace'
import { teammateTaskState, initialState } from '../atom'
import { TeammateTask } from '../type'
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

  return {
    addTeammateTask,
    setTeammateTaskById,
  }
}
