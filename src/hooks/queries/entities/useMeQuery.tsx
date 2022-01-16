import { useEffect, useState } from 'react'
import { useMeQuery as useMeQueryApollo } from 'src/graphql/hooks'
import { useMountedRef } from 'src/hooks'
import { useMeResponse, initialMeState } from 'src/store/entities/me'

export const useMeQuery = () => {
  const queryResult = useMeQueryApollo({
    fetchPolicy: 'cache-first',
  })
  const { setMe } = useMeResponse()
  const [loading, setLoading] = useState(true)
  const { mountedRef } = useMountedRef()

  useEffect(() => {
    setLoading(queryResult.loading)
  }, [queryResult.loading])

  useEffect(() => {
    if (!queryResult.data) return
    if (loading) return
    if (!mountedRef.current) return

    setMe(queryResult.data.me || initialMeState())
    setLoading(false)
  }, [loading, mountedRef, queryResult.data, setMe])

  return {
    refetch: queryResult.refetch,
    loading,
  }
}
