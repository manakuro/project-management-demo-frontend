import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useTeammateTaskCreatedSubscription as useSubscription } from 'src/graphql/hooks'
import { teammateTaskState } from '../atom'
import { TeammateTaskCreatedSubscriptionResponse as Response } from '../type'
import { useTeammateTaskResponse } from './useTeammateTaskResponse'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
  teammateId: string
}
export const useTeammateTaskCreatedSubscription = (props: Props) => {
  const { setTeammateTask } = useTeammateTaskResponse()

  const skipSubscription = useMemo(
    () => !props.teammateId || !props.workspaceId,
    [props.teammateId, props.workspaceId],
  )
  const subscriptionResult = useSubscription({
    variables: {
      teammateId: props.teammateId,
      workspaceId: props.workspaceId,
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
        const updated = response.teammateTaskCreated
        const prev = await snapshot.getPromise(teammateTaskState(updated.id))
        if (prev.id) return

        if (__DEV__) {
          console.log('Teammate Task Created!: ', prev)
        }

        setTeammateTask([updated])
      },
    [setTeammateTask],
  )

  return {
    subscriptionResult,
  }
}
