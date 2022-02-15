import isEqual from 'lodash-es/isEqual'
import { useRecoilCallback } from 'recoil'
import { useTaskUpdatedSubscription } from 'src/graphql/hooks'
import { omit } from 'src/shared/utils/omit'
import {
  initialState,
  taskState,
  TaskUpdatedSubscriptionResponse,
  useTaskCommand,
} from 'src/store/entities/task'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any
export const useSubscription = (taskId: string) => {
  const { upsert } = useTaskCommand()

  useTaskUpdatedSubscription({
    variables: {
      taskId: taskId,
    },
    onSubscriptionData: (data) => {
      if (
        isEqual(
          data.subscriptionData.data,
          previousData?.subscriptionData?.data,
        )
      )
        return

      if (data.subscriptionData.data)
        setTaskBySubscription(data.subscriptionData.data)
      previousData = data
    },
  })

  const setTaskBySubscription = useRecoilCallback(
    ({ snapshot }) =>
      async (response: TaskUpdatedSubscriptionResponse) => {
        const prev = await snapshot.getPromise(taskState(taskId))
        const updatedTask = response.taskUpdated

        if (isEqual(omit(updatedTask, 'updatedAt'), omit(prev, 'updatedAt')))
          return

        console.log('subscription updated!')

        upsert({
          ...prev,
          ...updatedTask,
          taskPriority: {
            ...(updatedTask.taskPriority || initialState().taskPriority),
          },
        })
      },
    [upsert, taskId],
  )
}
