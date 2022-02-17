import isEqual from 'lodash-es/isEqual'
import { useRecoilCallback } from 'recoil'
import { useProjectUpdatedSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { ProjectUpdatedSubscriptionResponse as Response } from '../type'
import { useProjectResponse } from './useProjectResponse'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

export const PROJECT_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid()

export const useProjectUpdatedSubscription = (projectId: string) => {
  const { setProjects } = useProjectResponse()

  useSubscription({
    variables: {
      id: projectId,
      requestId: PROJECT_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
    () => (response: Response) => {
      const projectUpdated = response.projectUpdated

      if (__DEV__) console.log('Project updated!: ')

      setProjects([projectUpdated])
    },
    [setProjects],
  )
}
