import { useRecoilCallback, useRecoilValue } from 'recoil'
import { useUpdateTaskMutation } from 'src/graphql/hooks'
import { omit } from 'src/shared/utils/omit'
import { useWorkspace } from 'src/store/entities/workspace'
import { taskState } from '../atom'
import { Task, UpdateTaskInput } from '../type'
import { hasTaskBeenPersisted } from '../util'
import {
  TASK_UPDATED_SUBSCRIPTION_REQUEST_ID,
  useTaskUpdatedSubscription,
} from './useTaskUpdatedSubscription'
import { useUpsert } from './useUpsert'

export const useTask = (taskId: string) => {
  const task = useRecoilValue(taskState(taskId))
  const { workspace } = useWorkspace()

  const { upsert } = useUpsert()
  const [updateTaskMutation] = useUpdateTaskMutation()

  const { hasDescriptionUpdated } = useTaskUpdatedSubscription({
    taskId,
    workspaceId: workspace.id,
  })

  const setTask = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<Task>) => {
        const prev = await snapshot.getPromise(taskState(taskId))
        if (!hasTaskBeenPersisted(prev)) return

        upsert({
          ...prev,
          ...val,
        })

        const res = await updateTaskMutation({
          variables: {
            input: prepareUpdateTaskInput(taskId, workspace.id, val),
          },
        })

        if (res.errors) {
          upsert(prev)
        }
      },
    [taskId, updateTaskMutation, upsert, workspace.id],
  )
  const setTaskPriority = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<Task['taskPriority']>) => {
        const prev = await snapshot.getPromise(taskState(taskId))
        await setTask({
          taskPriority: {
            ...prev.taskPriority,
            ...val,
          },
        })
      },
    [taskId, setTask],
  )

  const setTaskName = useRecoilCallback(
    ({ snapshot }) =>
      async (val: string) => {
        const prev = await snapshot.getPromise(taskState(taskId))
        // Skip when touching input for the first time
        if (prev.isNew && !prev.name && !val) return
        if (prev.name && val && prev.name === val) return

        const isNew = prev.isNew && !!val ? { isNew: false } : {}
        await setTask({ name: val, ...isNew })
      },
    [setTask, taskId],
  )

  return {
    task,
    setTask,
    setTaskPriority,
    setTaskName,
    hasDescriptionUpdated,
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

  return input
}
