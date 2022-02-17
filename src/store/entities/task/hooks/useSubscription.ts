import isEqual from 'lodash-es/isEqual'
import { useState } from 'react'
import { useRecoilCallback } from 'recoil'
import { useTaskUpdatedSubscription } from 'src/graphql/hooks'
import { isDescriptionEqual } from 'src/shared/editor/isDescriptionEqual'
import {
  initialState,
  Task,
  taskState,
  TaskUpdatedSubscriptionResponse,
  useTaskCommand,
} from 'src/store/entities/task'
import { isTaskEqual } from '../util'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any
export const useSubscription = (taskId: string) => {
  const { upsert } = useTaskCommand()
  const [hasDescriptionUpdated, setHasDescriptionUpdated] = useState<number>(1)

  const subscriptionResult = useTaskUpdatedSubscription({
    variables: {
      taskId: taskId,
    },
    onSubscriptionData: async (data) => {
      if (
        isEqual(
          data.subscriptionData.data,
          previousData?.subscriptionData?.data,
        )
      )
        return

      if (data.subscriptionData.data)
        await setTaskBySubscription(data.subscriptionData.data)
      previousData = data
    },
  })

  const setTaskBySubscription = useRecoilCallback(
    ({ snapshot }) =>
      async (response: TaskUpdatedSubscriptionResponse) => {
        const prev = await snapshot.getPromise(taskState(taskId))
        const updatedTask = response.taskUpdated

        if (isTaskEqual(prev, updatedTask as unknown as Task)) return

        console.log('subscription updated!')

        upsert({
          ...prev,
          ...updatedTask,
          taskPriority: {
            ...(updatedTask.taskPriority || initialState().taskPriority),
          },
          // To prevent autofocus on input.
          isNew: false,
        })

        if (!isDescriptionEqual(prev.description, updatedTask.description)) {
          setHasDescriptionUpdated((s) => s + 1)
        }
      },
    [upsert, taskId],
  )

  return {
    subscriptionResult,
    hasDescriptionUpdated,
  }
}
