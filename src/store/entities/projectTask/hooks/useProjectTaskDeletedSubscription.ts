import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useProjectTaskDeletedSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { ProjectTaskDeletedSubscriptionResponse as Response } from '../type'
import { useResetProjectTask } from './useResetProjectTask'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
}
export const PROJECT_TASK_DELETED_SUBSCRIPTION_REQUEST_ID = uuid()
export const useProjectTaskDeletedSubscription = (props: Props) => {
  const { resetProjectTask } = useResetProjectTask()

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  )
  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: PROJECT_TASK_DELETED_SUBSCRIPTION_REQUEST_ID,
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
    () => (response: Response) => {
      const projectTaskDeleted = response.projectTaskDeleted

      if (__DEV__) console.log('Project Task Deleted!: ')

      resetProjectTask(projectTaskDeleted.id)
    },
    [resetProjectTask],
  )

  return {
    subscriptionResult,
  }
}
