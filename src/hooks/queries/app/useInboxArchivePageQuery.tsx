import { useCallback, useMemo, useState } from 'react'
import { useInboxArchivePageQuery as useQuery } from 'src/graphql/hooks'
import { useMountedRef } from 'src/hooks'
import { useArchiveResponse } from 'src/store/app/inbox/archive'
import { useWorkspace } from 'src/store/entities/workspace'

export const useInboxArchivePageQuery = () => {
  const { workspace } = useWorkspace()
  const skip = useMemo(() => !workspace.id, [workspace.id])
  const [loading, setLoading] = useState(true)
  const { setArchive } = useArchiveResponse()
  const { mountedRef } = useMountedRef()

  const { refetch: refetchQuery } = useQuery({
    variables: {
      workspaceId: workspace.id,
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (!mountedRef.current) return

      setArchive(data)
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
