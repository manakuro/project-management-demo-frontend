import { useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { useWorkspaceUpdatedSubscription } from 'src/graphql/hooks'
import { workspaceState } from '../atom'

export const useWorkspace = () => {
  const [val, setVal] = useRecoilState(workspaceState)
  const subscriptionResult = useWorkspaceUpdatedSubscription({
    variables: {
      id: val.id,
    },
    skip: !val.id,
  })

  const workspace = useMemo(() => {
    return { ...val, ...(subscriptionResult.data?.workspaceUpdated || {}) }
  }, [subscriptionResult.data?.workspaceUpdated, val])

  return {
    workspace,
    setWorkspace: setVal,
  }
}
