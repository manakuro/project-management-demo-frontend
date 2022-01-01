import isEqual from 'lodash-es/isEqual'
import { useEffect, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useWorkspaceUpdatedSubscription } from 'src/graphql/hooks'
import { workspaceState } from '../atom'
import { Workspace } from '../type'

export const useWorkspace = () => {
  const [val, setVal] = useRecoilState(workspaceState)
  const skipSubscription = useMemo(() => {
    return !val.id
  }, [val.id])

  const subscriptionResult = useWorkspaceUpdatedSubscription({
    variables: {
      id: val.id,
    },
    skip: skipSubscription,
  })
  const [hasDescriptionUpdated, setHasDescriptionUpdated] = useState<number>(1)

  const workspace = useMemo<Workspace>(() => {
    const workspaceUpdated = subscriptionResult.data?.workspaceUpdated
    if (!workspaceUpdated) return val

    return { ...val, ...workspaceUpdated }
  }, [subscriptionResult.data?.workspaceUpdated, val])

  useEffect(() => {
    const updatedDescription =
      subscriptionResult.data?.workspaceUpdated?.description
    if (!updatedDescription) return

    if (
      !isEqual(
        val.description,
        subscriptionResult?.data?.workspaceUpdated.description,
      )
    ) {
      setHasDescriptionUpdated((s) => s + 1)
    }
    /* eslint react-hooks/exhaustive-deps: off */
  }, [subscriptionResult?.data?.workspaceUpdated?.updatedAt])

  return {
    workspace,
    setWorkspace: setVal,
    hasDescriptionUpdated,
  }
}
