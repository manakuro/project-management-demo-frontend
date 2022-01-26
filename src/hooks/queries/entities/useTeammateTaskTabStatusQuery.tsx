import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useTeammateTaskTabStatusQuery as useQuery } from 'src/graphql/hooks'
import { useMountedRef } from 'src/hooks'
import { useTeammateTaskTabStatusResponse } from 'src/store/entities/teammateTaskTabStatus'

const key = (str: string) =>
  `src/hooks/queries/useTabStatusForMyTasksQuery/${str}`

const loadingState = atom<boolean>({
  key: key('loadingState'),
  default: true,
})

export const useTeammateTaskTabStatusQuery = () => {
  const queryResult = useQuery()
  const { setTeammateTaskTabStatus } = useTeammateTaskTabStatusResponse()
  const [loading, setLoading] = useRecoilState(loadingState)
  const { mountedRef } = useMountedRef()

  useEffect(() => {
    setLoading(queryResult.loading)
  }, [queryResult.loading, setLoading])

  useEffect(() => {
    if (!queryResult.data?.teammateTaskTabStatus) return
    if (loading) return
    if (!mountedRef.current) return

    setTeammateTaskTabStatus(queryResult.data.teammateTaskTabStatus)
  }, [loading, mountedRef, queryResult.data, setTeammateTaskTabStatus])

  return {
    refetch: queryResult.refetch,
    loading,
  }
}
