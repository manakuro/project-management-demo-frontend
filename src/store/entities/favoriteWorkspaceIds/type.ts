import { FavoriteWorkspaceIdsResponse } from 'src/graphql/types/favoriteWorkspaceIds'

export type {
  FavoriteWorkspaceIdsResponse,
  FavoriteWorkspaceIdsUpdatedSubscription as FavoriteWorkspaceIdsUpdatedSubscriptionResponse,
} from 'src/graphql/types/favoriteWorkspaceIds'

export type FavoriteWorkspaceId = FavoriteWorkspaceIdsResponse[number]
