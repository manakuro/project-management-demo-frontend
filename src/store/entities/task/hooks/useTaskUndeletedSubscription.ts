import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useTaskUndeletedSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { deletedTaskState } from 'src/store/entities/deletedTask'
import { useProjectTaskResponse } from 'src/store/entities/projectTask'
import { useTeammateTaskResponse } from 'src/store/entities/teammateTask'
import { TaskUndeletedSubscriptionResponse as Response } from '../type'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  taskId: string
}
export const TASK_UNDELETED_SUBSCRIPTION_REQUEST_ID = uuid()
export const useTaskUndeletedSubscription = (props: Props) => {
  const { setTeammateTask } = useTeammateTaskResponse()
  const { setProjectTask } = useProjectTaskResponse()

  const skipSubscription = useMemo(() => !props.taskId, [props.taskId])
  const subscriptionResult = useSubscription({
    variables: {
      taskId: props.taskId,
      requestId: TASK_UNDELETED_SUBSCRIPTION_REQUEST_ID,
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
    skip: skipSubscription,
  })

  const setBySubscription = useRecoilCallback(
    ({ reset }) =>
      async (response: Response) => {
        const data = response.taskUndeleted

        if (__DEV__) console.log('Task undeleted!')

        if (data.deletedTasks) {
          data.deletedTasks.forEach((d) => {
            reset(deletedTaskState(d.id))
          })
        }
        if (data.projectTask) {
          setProjectTask([data.projectTask])
        }
        if (data.teammateTask) {
          setTeammateTask([data.teammateTask])
        }
      },
    [setProjectTask, setTeammateTask],
  )

  return {
    subscriptionResult,
  }
}
