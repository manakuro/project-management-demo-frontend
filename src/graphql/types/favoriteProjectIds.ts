import { FavoriteProjectIdsQuery } from 'src/graphql/types'

export type FavoriteProjectIdsResponse = NonNullable<
  FavoriteProjectIdsQuery['favoriteProjectIds']
>
