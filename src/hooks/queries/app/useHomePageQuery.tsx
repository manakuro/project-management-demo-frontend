import { useEffect, useMemo, useState } from 'react'
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

  const queryResult = useQuery({
    variables: {
      teammateId: me.id,
      workspaceId: workspace.id,
    },
    skip,
  })

  useEffect(() => {
    setLoading(queryResult.loading)
  }, [queryResult.loading])

  useEffect(() => {
    if (!queryResult.data) return
    if (loading) return
    if (!mountedRef.current) return

    setHome(queryResult.data)
    setLoading(false)
  }, [loading, mountedRef, queryResult.data, setHome])

  return {
    loading,
  }
}
