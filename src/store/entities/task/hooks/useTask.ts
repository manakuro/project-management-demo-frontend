import { useMemo } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { useUpdateTaskMutation } from 'src/graphql/hooks'
import {
  formatDueTimeToLocalTimezone,
  formatDueTimeToServerTimezone,
} from 'src/shared/date'
import { omit } from 'src/shared/utils/omit'
import { useWorkspace } from 'src/store/entities/workspace'
import { taskState } from '../atom'
import { Task, UpdateTaskInput } from '../type'
import { hasTaskBeenPersisted } from '../util'
import { useHasDescriptionUpdatedValue } from './useHasDescriptionUpdated'
import { TASK_UPDATED_SUBSCRIPTION_REQUEST_ID } from './useTaskUpdatedSubscription'
import { useUpsert } from './useUpsert'

export const useTask = (taskId: string) => {
  const task = useRecoilValue(taskState(taskId))
  const { workspace } = useWorkspace()

  const { upsert } = useUpsert()
  const [updateTaskMutation] = useUpdateTaskMutation()
  const { hasDescriptionUpdated } = useHasDescriptionUpdatedValue({
    taskId,
  })

  const setTask = useRecoilCallback(
    ({ snapshot }) =>
      async (input: Partial<Task>) => {
        const prev = await snapshot.getPromise(taskState(taskId))
        if (!hasTaskBeenPersisted(prev)) return

        upsert({ ...prev, ...input })

        const restore = () => {
          upsert(prev)
        }

        try {
          const res = await updateTaskMutation({
            variables: {
              input: prepareUpdateTaskInput(taskId, workspace.id, input),
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
    [taskId, updateTaskMutation, upsert, workspace.id],
  )

  const setTaskName = useRecoilCallback(
    ({ snapshot }) =>
      async (input: string) => {
        const prev = await snapshot.getPromise(taskState(taskId))
        // Skip when touching input for the first time
        if (prev.isNew && !prev.name && !input) return
        if (prev.name === input) return

        const isNew = prev.isNew && !!input ? { isNew: false } : {}
        await setTask({ name: input, ...isNew })
      },
    [setTask, taskId],
  )

  const setTaskDueDate = useRecoilCallback(
    () => async (input: Date) => {
      await setTask({ dueDate: formatDueTimeToLocalTimezone(input) })
    },
    [setTask],
  )

  const resetTaskDueDate = useRecoilCallback(
    () => async () => {
      await setTask({ dueDate: '' })
    },
    [setTask],
  )

  const isSubtask = useMemo<boolean>(
    () => !!task.taskParentId,
    [task.taskParentId],
  )

  return {
    task,
    setTask,
    setTaskName,
    setTaskDueDate,
    resetTaskDueDate,
    hasDescriptionUpdated,
    isSubtask,
  }
}

const prepareUpdateTaskInput = (
  taskId: string,
  workspaceId: string,
  val: Partial<Task>,
): UpdateTaskInput => {
  let input: UpdateTaskInput = {
    id: taskId,
    workspaceId,
    requestId: TASK_UPDATED_SUBSCRIPTION_REQUEST_ID,
    ...val,
  }
  if (input.dueDate === '') {
    input = omit(input, 'dueDate')
    input.clearDueDate = true
  }
  if (input.dueTime === '') {
    input = omit(input, 'dueTime')
    input.clearDueDate = true
  }
  if (input.assigneeId === '') {
    input = omit(input, 'assigneeId')
    input.clearTeammate = true
  }
  if (input.dueDate) {
    input.dueDate = formatDueTimeToServerTimezone(new Date(input.dueDate))
  }

  return input
}
