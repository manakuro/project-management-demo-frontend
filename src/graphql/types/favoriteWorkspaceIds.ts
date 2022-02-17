import { FavoriteWorkspaceIdsQuery } from 'src/graphql/types'

export type FavoriteWorkspaceIdsResponse = NonNullable<
  FavoriteWorkspaceIdsQuery['favoriteWorkspaceIds']
>

export type { FavoriteWorkspaceIdsUpdatedSubscription } from 'src/graphql/types'
