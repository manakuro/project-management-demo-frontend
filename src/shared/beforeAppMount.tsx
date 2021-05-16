import React, { useEffect } from 'react'
import {
  useProjectsQuery,
  useFavoriteProjectIdsQuery,
  useWorkspaceQuery,
  useMeQuery,
} from 'src/hooks/queries'

export const BeforeAppMount: React.FC = (props) => {
  const projectQueryResult = useProjectsQuery({ lazy: true })
  const favoriteProjectIdsQueryResult = useFavoriteProjectIdsQuery({
    lazy: true,
  })
  const workspaceQueryResult = useWorkspaceQuery({
    lazy: true,
  })
  const meQueryResult = useMeQuery({
    lazy: true,
  })

  useEffect(() => {
    console.log('BeforeAppMount!!')
    projectQueryResult.refetch()
    favoriteProjectIdsQueryResult.refetch()
    workspaceQueryResult.refetch()
    meQueryResult.refetch()

    /* eslint react-hooks/exhaustive-deps: off */
  }, [])

  return props.children as React.ReactElement
}
