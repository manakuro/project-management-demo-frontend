import { useRecoilCallback } from 'recoil'
import { useCreateTeammateTaskMutation } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { useMe } from 'src/store/entities/me'
import { taskState, useTaskCommand } from 'src/store/entities/task'
import { teammateTaskState, initialState } from '../atom'
import { TeammateTask } from '../type'
import { useTeammateTaskResponse } from './useTeammateTaskResponse'

export const useTeammateTaskCommand = () => {
  const { me } = useMe()
  const { addTask } = useTaskCommand()
  const [createTeammateTaskMutation] = useCreateTeammateTaskMutation()
  const { setTeammateTask } = useTeammateTaskResponse()

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
    [addTask, createTeammateTaskMutation, me.id, setTeammateTask, upsert],
  )

  return {
    addTeammateTask,
    setTeammateTaskById,
  }
}
