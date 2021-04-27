import React, { useEffect } from 'react'
import {
  useProjectsQuery,
  useFavoriteProjectIdsQuery,
  useWorkspaceQuery,
} from 'src/hooks/queries'

export const BeforeAppMount: React.FC = (props) => {
  const projectQueryResult = useProjectsQuery({ lazy: true })
  const favoriteProjectIdsQueryResult = useFavoriteProjectIdsQuery({
    lazy: true,
  })
  const workspaceQueryResult = useWorkspaceQuery({
    lazy: true,
  })

  useEffect(() => {
    console.log('BeforeAppMount!!')
    projectQueryResult.refetch()
    favoriteProjectIdsQueryResult.refetch()
    workspaceQueryResult.refetch()

    /* eslint react-hooks/exhaustive-deps: off */
  }, [])

  return props.children as React.ReactElement
}
