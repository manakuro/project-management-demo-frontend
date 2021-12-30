import { isEqual } from 'lodash-es'
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
  const [updated, setUpdated] = useState<boolean>(false)

  const workspace = useMemo<Workspace>(() => {
    const workspaceUpdated = subscriptionResult.data?.workspaceUpdated
    if (!workspaceUpdated) return val

    return { ...val, ...workspaceUpdated }
  }, [subscriptionResult.data?.workspaceUpdated, val])

  useEffect(() => {
    const updatedDescription =
      subscriptionResult.data?.workspaceUpdated?.description
    if (!updatedDescription) {
      setUpdated(false)
      return
    }
    if (subscriptionResult.loading) {
      setUpdated(false)
      return
    }
    if (!isEqual(workspace.description, updatedDescription)) {
      console.log('updated!')
      setUpdated(true)
    }
  }, [
    subscriptionResult.data?.workspaceUpdated,
    subscriptionResult.loading,
    workspace.description,
  ])

  return {
    workspace,
    setWorkspace: setVal,
    updated,
  }
}
