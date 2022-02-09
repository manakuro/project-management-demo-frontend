import { useCallback, useMemo, useState } from 'react'
import { useHomePageQuery as useQuery } from 'src/graphql/hooks'
import { useMountedRef } from 'src/hooks'
import { useHomeResponse } from 'src/store/app/home'
import { useMe } from 'src/store/entities/me'
import { useWorkspace } from 'src/store/entities/workspace'

export const useHomePageQuery = () => {
  const { me } = useMe()
  const { workspace } = useWorkspace()
  const skip = useMemo(() => !me.id || !workspace.id, [me.id, workspace.id])
  const [loading, setLoading] = useState(true)
  const { setHome } = useHomeResponse()
  const { mountedRef } = useMountedRef()

  const { refetch: refetchQuery } = useQuery({
    variables: {
      teammateId: me.id,
      workspaceId: workspace.id,
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (!mountedRef.current) return

      setHome(data)
      endLoading()
    },
    skip,
  })

  const startLoading = useCallback(() => {
    setLoading(true)
  }, [])

  const endLoading = useCallback(() => {
    setLoading(false)
  }, [])

  const refetch = useCallback(async () => {
    startLoading()
    setTimeout(async () => {
      await refetchQuery()
    })
  }, [refetchQuery, startLoading])

  return {
    loading,
    refetch,
  }
}
