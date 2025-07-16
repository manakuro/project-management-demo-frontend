import isEqual from 'lodash-es/isEqual'
import { useRecoilCallback } from 'recoil'
import { useTaskUnassignedSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import {
  type TaskUnassignedSubscriptionResponse,
  useTaskCommand,
} from 'src/store/entities/task'
import { useResetTeammateTask } from 'src/store/entities/teammateTask'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
}

export const TASK_UNASSIGNED_SUBSCRIPTION_REQUEST_ID = uuid()
export const useTaskUnassignedSubscription = (props: Props) => {
  const { resetTeammateTask } = useResetTeammateTask()
  const { setTaskById } = useTaskCommand()

  useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_UNASSIGNED_SUBSCRIPTION_REQUEST_ID,
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
    () => async (response: TaskUnassignedSubscriptionResponse) => {
      const data = response.taskUnassigned

      if (__DEV__) console.log('task unassigned!')

      resetTeammateTask(data.teammateTaskId)
      await setTaskById(data.task.id, { assigneeId: '' })
    },
    [resetTeammateTask, setTaskById],
  )
}
