import React, { useEffect } from 'react'
import { useProjectsQuery } from 'src/hooks/queries'
import { useFavoriteProjectIdsQuery } from 'src/hooks/queries/useFavoriteProjectIdsQuery'

export const BeforeAppMount: React.FC = (props) => {
  const projectQueryResult = useProjectsQuery({ lazy: true })
  const favoriteProjectIdsQueryResult = useFavoriteProjectIdsQuery({
    lazy: true,
  })

  useEffect(() => {
    console.log('BeforeAppMount fetch!!')
    projectQueryResult.refetch()
    favoriteProjectIdsQueryResult.refetch()

    /* eslint react-hooks/exhaustive-deps: off */
  }, [])

  console.log('BeforeAppMount!!')

  return props.children as React.ReactElement
}
