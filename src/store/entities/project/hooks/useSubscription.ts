import { useEffect } from 'react'
import { useProjectUpdatedSubscription } from 'src/graphql/hooks'
import { useProjectCommand } from './useProjectCommand'

export const useSubscription = (projectId: string) => {
  const { setProjectBySubscription } = useProjectCommand()
  const subscriptionResult = useProjectUpdatedSubscription({
    variables: {
      id: projectId,
    },
  })

  useEffect(() => {
    if (subscriptionResult.loading) return
    if (!subscriptionResult.data?.projectUpdated) return

    setProjectBySubscription(projectId, subscriptionResult.data.projectUpdated)

    /* eslint react-hooks/exhaustive-deps: off */
  }, [projectId, subscriptionResult.data?.projectUpdated?.updatedAt])
}
