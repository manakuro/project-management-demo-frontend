import { useEffect, useState } from 'react'
import { useProjectIconsQuery as useQuery } from 'src/graphql/hooks'
import { ProjectIconsQuery } from 'src/graphql/types/projectIcons'
import { useMountedRef } from 'src/hooks'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import {
  ProjectIconResponse,
  useProjectIconsResponse,
} from 'src/store/entities/projectIcons'

export const useProjectIconsQuery = () => {
  const queryResult = useQuery()
  const { setProjectIcons } = useProjectIconsResponse()
  const [loading, setLoading] = useState(true)
  const { mountedRef } = useMountedRef()

  useEffect(() => {
    setLoading(queryResult.loading)
  }, [queryResult.loading])

  useEffect(() => {
    if (!queryResult.data?.projectIcons) return
    if (loading) return
    if (!mountedRef.current) return

    const projectIcons = getNodesFromEdges<
      ProjectIconResponse,
      ProjectIconsQuery['projectIcons']
    >(queryResult.data.projectIcons)

    setProjectIcons(projectIcons)
  }, [loading, mountedRef, queryResult.data, setProjectIcons])

  return {
    refetch: queryResult.refetch,
    loading,
  }
}
