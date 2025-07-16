import type { FavoriteWorkspaceIdsQuery } from 'src/graphql/types'

export type FavoriteWorkspaceIdsResponse = NonNullable<
  FavoriteWorkspaceIdsQuery['favoriteWorkspaceIds']
>

export type { FavoriteWorkspaceIdsUpdatedSubscription as FavoriteWorkspaceIdsUpdatedSubscriptionResponse } from 'src/graphql/types'
