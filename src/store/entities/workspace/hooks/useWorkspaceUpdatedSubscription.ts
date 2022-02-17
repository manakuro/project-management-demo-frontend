import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { atom, useRecoilCallback, useRecoilState } from 'recoil'
import { useWorkspaceUpdatedSubscription as useSubscription } from 'src/graphql/hooks'
import { isDescriptionEqual } from 'src/shared/editor/isDescriptionEqual'
import { uuid } from 'src/shared/uuid'
import { workspaceState } from '../atom'
import { WorkspaceUpdatedSubscriptionResponse as Response } from '../type'
import { useWorkspaceResponse } from './useWorkspaceResponse'

const key = (str: string) =>
  `src/store/entities/workspace/hooks/useWorkspaceUpdatedSubscription/${str}`

const hasDescriptionUpdatedState = atom<number>({
  key: key('hasDescriptionUpdatedState'),
  default: 1,
})

export const WORKSPACE_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid()

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
}
export const useWorkspaceUpdatedSubscription = (props: Props) => {
  const skipSubscription = useMemo(() => {
    return !props.workspaceId
  }, [props.workspaceId])

  const { setWorkspace } = useWorkspaceResponse()
  const [hasDescriptionUpdated, setHasDescriptionUpdated] = useRecoilState(
    hasDescriptionUpdatedState,
  )

  useSubscription({
    variables: {
      id: props.workspaceId,
      requestId: WORKSPACE_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
    ({ snapshot }) =>
      async (response: Response) => {
        const prev = await snapshot.getPromise(workspaceState)
        const workspaceUpdated = response.workspaceUpdated

        if (__DEV__) console.log('Workspace updated!: ')

        setWorkspace(workspaceUpdated)
        if (
          !isDescriptionEqual(prev.description, workspaceUpdated.description)
        ) {
          if (__DEV__) console.log('Workspace description updated!: ')
          setHasDescriptionUpdated((s) => s + 1)
        }
      },
    [setHasDescriptionUpdated, setWorkspace],
  )

  return {
    hasDescriptionUpdated,
  }
}
