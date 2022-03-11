import isEqual from 'lodash-es/isEqual'
import { useRecoilCallback } from 'recoil'
import { useTaskAssignedSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { TaskAssignedSubscriptionResponse } from 'src/store/entities/task'
import { useTeammateTaskResponse } from 'src/store/entities/teammateTask'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
}

export const TASK_ASSIGNED_SUBSCRIPTION_REQUEST_ID = uuid()
export const useTaskAssignedSubscription = (props: Props) => {
  const { setTeammateTask } = useTeammateTaskResponse()

  useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_ASSIGNED_SUBSCRIPTION_REQUEST_ID,
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
    () => async (response: TaskAssignedSubscriptionResponse) => {
      const data = response.taskAssigned

      if (__DEV__) console.log('task assigned!')

      setTeammateTask([data.teammateTask])
    },
    [setTeammateTask],
  )
}
