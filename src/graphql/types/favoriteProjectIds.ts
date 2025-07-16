import type { FavoriteProjectIdsQuery } from 'src/graphql/types'

export type FavoriteProjectIdsResponse = NonNullable<
  FavoriteProjectIdsQuery['favoriteProjectIds']
>

export type { FavoriteProjectIdsUpdatedSubscription as FavoriteProjectIdsUpdatedSubscriptionResponse } from 'src/graphql/types'
