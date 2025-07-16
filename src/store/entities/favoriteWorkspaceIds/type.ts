import type { FavoriteWorkspaceIdsResponse } from 'src/graphql/types/favoriteWorkspaceIds';

export type {
  FavoriteWorkspaceIdsResponse,
  FavoriteWorkspaceIdsUpdatedSubscriptionResponse,
} from 'src/graphql/types/favoriteWorkspaceIds';

export type FavoriteWorkspaceId = FavoriteWorkspaceIdsResponse[number];
