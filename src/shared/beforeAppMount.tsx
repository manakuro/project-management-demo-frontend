import React, { useEffect } from 'react'
import { useProjectsQuery } from 'src/hooks/queries'
import { useFavoriteProjectIdsQuery } from 'src/hooks/queries/useFavoriteProjectIdsQuery'

export const BeforeAppMount: React.FC = (props) => {
  const projectQueryResult = useProjectsQuery({ lazy: true })
  const favoriteProjectIdsQueryResult = useFavoriteProjectIdsQuery({
    lazy: true,
  })

  useEffect(() => {
    console.log('BeforeAppMount!!')
    projectQueryResult.refetch()
    favoriteProjectIdsQueryResult.refetch()

    /* eslint react-hooks/exhaustive-deps: off */
  }, [])

  return props.children as React.ReactElement
}
