import { useRecoilCallback } from 'recoil'
import { useCreateTeammateTaskMutation } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { useMe } from 'src/store/entities/me'
import { taskState, useTaskCommand } from 'src/store/entities/task'
import { useWorkspace } from 'src/store/entities/workspace'
import { teammateTaskState, initialState } from '../atom'
import { TeammateTask } from '../type'
import { useTeammateTaskCreatedSubscription } from './useTeammateTaskCreatedSubscription'
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
        params: Partial<TeammateTask> & { teammateTaskSectionId: string },
      ) => {
        const id = uuid()
        const newTaskId = addTask({
          assigneeId: me.id,
          taskSectionId: params.teammateTaskSectionId,
        })
        const newTeammateTask = {
          ...initialState(),
          ...params,
          id,
          taskId: newTaskId,
          teammateId: me.id,
        }
        upsert(newTeammateTask)

        const res = await createTeammateTaskMutation({
          variables: {
            input: {
              teammateId: me.id,
              teammateTaskSectionId: params.teammateTaskSectionId,
              workspaceId: workspace.id,
            },
          },
        })
        if (res.errors) {
          reset(teammateTaskState(id))
          reset(taskState(newTaskId))
          return ''
        }

        const addedTeammateTask = res.data?.createTeammateTask
        if (!addedTeammateTask) return ''

        reset(teammateTaskState(id))
        reset(taskState(newTaskId))
        setTeammateTask([addedTeammateTask])

        return addedTeammateTask.id
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
