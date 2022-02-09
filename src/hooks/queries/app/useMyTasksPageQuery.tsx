import { useCallback, useMemo, useState } from 'react'
import { useMyTasksPageQuery as useQuery } from 'src/graphql/hooks'
import { useMountedRef } from 'src/hooks'
import { useMyTasksResponse } from 'src/store/app/myTasks'
import { useMe } from 'src/store/entities/me'
import { useWorkspace } from 'src/store/entities/workspace'

export const useMyTasksPageQuery = () => {
  const { me } = useMe()
  const { workspace } = useWorkspace()
  const skip = useMemo(() => !me.id || !workspace.id, [me.id, workspace.id])
  const [loading, setLoading] = useState(true)
  const { setMyTasks } = useMyTasksResponse()
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

      setMyTasks(data)
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
    refetch,
    loading,
  }
}
