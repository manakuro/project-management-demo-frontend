import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useProjectTaskCreatedSubscription as useSubscription } from 'src/graphql/hooks'
import { projectTaskState } from '../atom'
import { ProjectTaskCreatedSubscriptionResponse as Response } from '../type'
import { useProjectTaskResponse } from './useProjectTaskResponse'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  projectId: string
}
export const useProjectTaskCreatedSubscription = (props: Props) => {
  const { setProjectTask } = useProjectTaskResponse()

  const skipSubscription = useMemo(() => !props.projectId, [props.projectId])
  const subscriptionResult = useSubscription({
    variables: {
      projectId: props.projectId,
    },
    onSubscriptionData: async (data) => {
      if (
        isEqual(
          data.subscriptionData.data,
          previousData?.subscriptionData?.data,
        )
      )
        return

      if (data.subscriptionData.data)
        await setBySubscription(data.subscriptionData.data)
      previousData = data
    },
    skip: skipSubscription,
  })

  const setBySubscription = useRecoilCallback(
    ({ snapshot }) =>
      async (response: Response) => {
        const updated = response.projectTaskCreated
        const prev = await snapshot.getPromise(projectTaskState(updated.id))
        if (prev.id) return

        if (__DEV__) {
          console.log('Project Task Created!: ', prev, updated)
        }

        setProjectTask([updated])
      },
    [setProjectTask],
  )

  return {
    subscriptionResult,
  }
}
