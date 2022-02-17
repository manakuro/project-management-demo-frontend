import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useProjectTaskSectionUpdatedSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { ProjectTaskSectionUpdatedSubscriptionResponse as Response } from '../type'
import { useProjectTaskSectionResponse } from './useProjectTaskSectionResponse'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  projectTaskSectionId: string
}
export const PROJECT_TASK_SECTION_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid()
export const useProjectTaskSectionUpdatedSubscription = (props: Props) => {
  const { setProjectsTaskSections } = useProjectTaskSectionResponse()

  const skipSubscription = useMemo(
    () => !props.projectTaskSectionId,
    [props.projectTaskSectionId],
  )
  const subscriptionResult = useSubscription({
    variables: {
      id: props.projectTaskSectionId,
      requestId: PROJECT_TASK_SECTION_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
      const updated = response.projectTaskSectionUpdated

      if (__DEV__) console.log('Project Task Section updated!')

      setProjectsTaskSections([updated])
    },
    [setProjectsTaskSections],
  )

  return {
    subscriptionResult,
  }
}
