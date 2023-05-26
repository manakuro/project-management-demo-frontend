import React, { memo } from 'react'
import { useFavoriteProjectIds } from 'src/store/entities/favoriteProjectIds'
import { ListItem } from './ListItem'

type Props = {}

export const ProjectList: React.FC<Props> = memo(() => {
  const { favoriteProjectIds } = useFavoriteProjectIds()

  return (
    <>
      {favoriteProjectIds.map((id) => (
        <ListItem projectId={id} key={id} />
      ))}
    </>
  )
})
ProjectList.displayName = 'ProjectList'
