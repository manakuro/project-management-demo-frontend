import { useEffect, useMemo, useState } from 'react'
import { useFavoriteProjectIdsQuery as useQuery } from 'src/graphql/hooks'
import { useMountedRef } from 'src/hooks'
import { useFavoriteProjectIdsResponse } from 'src/store/entities/favoriteProjectIds'
import { useMe } from 'src/store/entities/me'

export const useFavoriteProjectIdsQuery = () => {
  const { me } = useMe()
  const skip = useMemo(() => !me.id, [me.id])

  const queryResult = useQuery({
    variables: {
      teammateId: me.id,
    },
    skip,
  })
  const { setFavoriteProjectIds } = useFavoriteProjectIdsResponse()
  const [loading, setLoading] = useState(queryResult.loading)
  const { mountedRef } = useMountedRef()

  useEffect(() => {
    setLoading(queryResult.loading)
  }, [queryResult.loading])

  useEffect(() => {
    if (!queryResult.data) return
    if (loading) return
    if (!mountedRef.current) return

    setFavoriteProjectIds(queryResult.data.favoriteProjectIds)
    setLoading(false)
  }, [loading, mountedRef, queryResult.data, setFavoriteProjectIds])

  return {
    refetch: queryResult.refetch,
    loading,
  }
}
