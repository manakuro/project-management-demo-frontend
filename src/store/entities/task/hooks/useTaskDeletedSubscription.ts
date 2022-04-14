import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useTaskDeletedSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { useDeletedTaskResponse } from 'src/store/entities/deletedTask'
import { useResetProjectTask } from 'src/store/entities/projectTask'
import { teammateTaskState } from 'src/store/entities/teammateTask'
import { TaskDeletedSubscriptionResponse as Response } from '../type'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
}
export const TASK_DELETED_SUBSCRIPTION_REQUEST_ID = uuid()
export const useTaskDeletedSubscription = (props: Props) => {
  const { setDeletedTask } = useDeletedTaskResponse()
  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  )
  const { resetProjectTasks } = useResetProjectTask()

  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_DELETED_SUBSCRIPTION_REQUEST_ID,
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
        const data = response.taskDeleted

        if (__DEV__) console.log('Task deleted!')

        if (data.teammateTask.id) {
          reset(teammateTaskState(data.teammateTask.id))
        }
        if (data.projectTasks?.length) {
          resetProjectTasks(data.projectTasks.map((p) => p.id))
        }
        if (data.deletedTasks) {
          setDeletedTask(data.deletedTasks, { includeTask: false })
        }
      },
    [resetProjectTasks, setDeletedTask],
  )

  return {
    subscriptionResult,
  }
}
