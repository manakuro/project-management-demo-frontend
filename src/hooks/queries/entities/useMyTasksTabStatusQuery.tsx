import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useMyTasksTabStatusQuery as useQuery } from 'src/graphql/hooks'
import { useMountedRef } from 'src/hooks'
import { useMyTasksTabStatusResponse } from 'src/store/entities/myTasksTabStatus'

const key = (str: string) =>
  `src/hooks/queries/useTabStatusForMyTasksQuery/${str}`

const loadingState = atom<boolean>({
  key: key('loadingState'),
  default: true,
})

export const useMyTasksTabStatusQuery = () => {
  const queryResult = useQuery()
  const { setMyTaskTabStatus } = useMyTasksTabStatusResponse()
  const [loading, setLoading] = useRecoilState(loadingState)
  const { mountedRef } = useMountedRef()

  useEffect(() => {
    setLoading(queryResult.loading)
  }, [queryResult.loading, setLoading])

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
