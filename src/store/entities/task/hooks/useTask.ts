import { useRecoilCallback, useRecoilValue } from 'recoil'
import { useUpdateTaskMutation } from 'src/graphql/hooks'
import { omit } from 'src/shared/utils/omit'
import { taskState } from '../atom'
import { Task, UpdateTaskInput } from '../type'
import { hasTaskBeenPersisted } from '../util'
import { useTaskCommand } from './useTaskCommand'
import {
  TASK_UPDATED_SUBSCRIPTION_REQUEST_ID,
  useTaskUpdatedSubscription,
} from './useTaskUpdatedSubscription'

export const useTask = (taskId: string) => {
  const task = useRecoilValue(taskState(taskId))
  const { upsert } = useTaskCommand()
  const [updateTaskMutation] = useUpdateTaskMutation()

  const { hasDescriptionUpdated } = useTaskUpdatedSubscription(taskId)

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
            input: prepareUpdateTaskInput(taskId, val),
          },
        })

        if (res.errors) {
          upsert(prev)
        }
      },
    [taskId, updateTaskMutation, upsert],
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

  // TODO(deleted task): Implement deleted functionality
  const deleteTask = useRecoilCallback(
    () => async () => {
      console.log('deleteTask!')
      // await setTask({ isDeleted: true } as any)
    },
    [],
  )
  const undeleteTask = useRecoilCallback(
    () => async () => {
      console.log('undeleteTask!')
      // await setTask({ isDeleted: false } as any)
    },
    [],
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
    deleteTask,
    undeleteTask,
    setTaskName,
    hasDescriptionUpdated,
  }
}

const prepareUpdateTaskInput = (
  taskId: string,
  val: Partial<Task>,
): UpdateTaskInput => {
  let input: UpdateTaskInput = {
    id: taskId,
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
