import React, { memo } from 'react'
import { useFavoriteWorkspaceIds } from 'src/store/entities/favoriteWorkspaceIds'
import { ListItem } from './ListItem'

type Props = {}

export const WorkspaceList: React.VFC<Props> = memo(() => {
  const { favoriteWorkspaceIds } = useFavoriteWorkspaceIds()

  return <>{favoriteWorkspaceIds.length > 0 && <ListItem />}</>
})
WorkspaceList.displayName = 'WorkspaceList'
