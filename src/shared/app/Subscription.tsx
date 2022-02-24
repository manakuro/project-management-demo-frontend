import React, { memo } from 'react'
import { useFavoriteProjectIdsUpdatedSubscription } from 'src/store/entities/favoriteProjectIds'
import { useMe } from 'src/store/entities/me'
import { useWorkspace } from 'src/store/entities/workspace'

export const Subscription: React.FC = memo((props) => {
  const { workspace } = useWorkspace()
  const { me } = useMe()

  useFavoriteProjectIdsUpdatedSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  })

  return props.children as React.ReactElement
})
Subscription.displayName = 'Subscription'
