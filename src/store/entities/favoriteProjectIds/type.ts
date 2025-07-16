import type { FavoriteProjectIdsResponse } from 'src/graphql/types/favoriteProjectIds'

export type {
  FavoriteProjectIdsResponse,
  FavoriteProjectIdsUpdatedSubscriptionResponse,
} from 'src/graphql/types/favoriteProjectIds'

export type FavoriteProjectId = FavoriteProjectIdsResponse[number]
