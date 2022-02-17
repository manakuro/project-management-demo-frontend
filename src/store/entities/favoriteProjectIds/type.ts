import { FavoriteProjectIdsResponse } from 'src/graphql/types/favoriteProjectIds'

export type {
  FavoriteProjectIdsResponse,
  FavoriteProjectIdsUpdatedSubscription as FavoriteProjectIdsUpdatedSubscriptionResponse,
} from 'src/graphql/types/favoriteProjectIds'

export type FavoriteProjectId = FavoriteProjectIdsResponse[number]
