import React from 'react'
import { useProjectsQuery } from 'src/hooks/queries'
import { useFavoriteProjectIdsQuery } from 'src/hooks/queries/useFavoriteProjectIdsQuery'

export const BeforeAppMount: React.FC = (props) => {
  useProjectsQuery()
  useFavoriteProjectIdsQuery()

  return props.children as React.ReactElement
}
