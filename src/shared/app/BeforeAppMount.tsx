import React, { useEffect } from 'react'
import { PageLoader } from 'src/components/molecules'
import {
  useProjectsQuery,
  useFavoriteProjectIdsQuery,
  useWorkspaceQuery,
  useMeQuery,
  useTeammateTaskTabStatusQuery,
  useFavoriteWorkspaceIdsQuery,
  useProjectBaseColorsQuery,
  useProjectLightColorsQuery,
  useProjectIconsQuery,
} from 'src/hooks/queries/entities'
import { useMe } from 'src/store/entities/me'

export const BeforeAppMount: React.FC = (props) => {
  useProjectsQuery()
  useProjectBaseColorsQuery()
  useProjectLightColorsQuery()
  useProjectIconsQuery()
  useFavoriteWorkspaceIdsQuery()
  useWorkspaceQuery()
  useMeQuery()
  useFavoriteProjectIdsQuery()
  useTeammateTaskTabStatusQuery()

  const { me } = useMe()

  useEffect(() => {
    console.log('BeforeAppMount!!')
    /* eslint react-hooks/exhaustive-deps: off */
  }, [])

  if (!me.id) return <PageLoader />

  return props.children as React.ReactElement
}
