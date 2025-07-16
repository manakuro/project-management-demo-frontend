import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useProjectTaskCreatedSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import type { ProjectTaskCreatedSubscriptionResponse as Response } from '../type'
import { useProjectTaskResponse } from './useProjectTaskResponse'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
}
export const PROJECT_TASK_CREATED_SUBSCRIPTION_REQUEST_ID = uuid()
export const useProjectTaskCreatedSubscription = (props: Props) => {
  const { setProjectTask } = useProjectTaskResponse()

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  )
  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: PROJECT_TASK_CREATED_SUBSCRIPTION_REQUEST_ID,
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
      const projectTaskCreated = response.projectTaskCreated

      if (__DEV__) console.log('Project Task Created!: ')

      setProjectTask([
        {
          ...projectTaskCreated,
          task: {
            ...projectTaskCreated.task,
            // To prevent autofocus on input.
            isNew: false,
          },
        },
      ])
    },
    [setProjectTask],
  )

  return {
    subscriptionResult,
  }
}
