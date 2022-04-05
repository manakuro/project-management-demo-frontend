import { useMemo } from 'react'
import { useFavoriteProjectIdsQuery as useQuery } from 'src/graphql/hooks'
import { useFavoriteProjectIdsResponse } from 'src/store/entities/favoriteProjectIds'
import { useMe } from 'src/store/entities/me'

export const useFavoriteProjectIdsQuery = () => {
  const { me } = useMe()
  const skip = useMemo(() => !me.id, [me.id])
  const { setFavoriteProjectIds } = useFavoriteProjectIdsResponse()

  const queryResult = useQuery({
    variables: {
      teammateId: me.id,
    },
    skip,
    onCompleted: (data) => {
      setFavoriteProjectIds(data.favoriteProjectIds)
    },
  })

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  }
}
