import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { useProjectUpdatedSubscription } from 'src/graphql/hooks'
import { projectState } from '../atom'
import { useProjectCommand } from './useProjectCommand'

export const useProject = (projectId: string) => {
  const { setProjectBySubscription } = useProjectCommand()
  const project = useRecoilValue(projectState(projectId))
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

  return {
    project,
  }
}
