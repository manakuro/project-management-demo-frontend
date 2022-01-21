import { useEffect, useState } from 'react'
import { useMyTasksTabStatusQuery as useQuery } from 'src/graphql/hooks'
import { useMountedRef } from 'src/hooks'
import { useMyTasksTabStatusResponse } from 'src/store/entities/myTasksTabStatus'

export const useMyTasksTabStatusQuery = () => {
  const queryResult = useQuery()
  const { setMyTaskTabStatus } = useMyTasksTabStatusResponse()
  const [loading, setLoading] = useState(true)
  const { mountedRef } = useMountedRef()

  useEffect(() => {
    setLoading(queryResult.loading)
  }, [queryResult.loading])

  useEffect(() => {
    if (!queryResult.data?.myTasksTabStatus) return
    if (loading) return
    if (!mountedRef.current) return

    setMyTaskTabStatus(queryResult.data.myTasksTabStatus)
  }, [loading, mountedRef, queryResult.data, setMyTaskTabStatus])

  return {
    refetch: queryResult.refetch,
    loading,
  }
}
