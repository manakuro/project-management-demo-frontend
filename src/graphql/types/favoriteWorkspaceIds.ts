import { FavoriteWorkspaceIdsQuery } from 'src/graphql/types'

export type FavoriteWorkspaceIdsResponse = NonNullable<
  FavoriteWorkspaceIdsQuery['favoriteWorkspaceIds']
>
