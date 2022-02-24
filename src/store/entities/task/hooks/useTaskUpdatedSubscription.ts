import isEqual from 'lodash-es/isEqual'
import { atomFamily, useRecoilCallback, useRecoilState } from 'recoil'
import { useTaskUpdatedSubscription as useSubscription } from 'src/graphql/hooks'
import { isDescriptionEqual } from 'src/shared/editor/isDescriptionEqual'
import { uuid } from 'src/shared/uuid'
import {
  initialState,
  taskState,
  TaskUpdatedSubscriptionResponse,
} from 'src/store/entities/task'
import { useUpsert } from './useUpsert'

const key = (str: string) =>
  `src/store/entities/task/hooks/useTaskUpdatedSubscription/${str}`

const hasDescriptionUpdatedState = atomFamily<number, string>({
  key: key('hasDescriptionUpdatedState'),
  default: 1,
})

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
  taskId: string
}

export const TASK_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid()
export const useTaskUpdatedSubscription = (props: Props) => {
  const { upsert } = useUpsert()
  const [hasDescriptionUpdated, setHasDescriptionUpdated] = useRecoilState(
    hasDescriptionUpdatedState(props.workspaceId),
  )

  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
        setBySubscription(data.subscriptionData.data)
      previousData = data
    },
  })

  const setBySubscription = useRecoilCallback(
    ({ snapshot }) =>
      async (response: TaskUpdatedSubscriptionResponse) => {
        const prev = await snapshot.getPromise(taskState(props.taskId))
        const updatedTask = response.taskUpdated

        console.log('task updated!')

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
    [props.taskId, upsert, setHasDescriptionUpdated],
  )

  return {
    subscriptionResult,
    hasDescriptionUpdated,
  }
}
