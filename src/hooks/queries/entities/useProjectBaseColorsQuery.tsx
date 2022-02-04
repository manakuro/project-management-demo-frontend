import { useEffect, useState } from 'react'
import { useProjectBaseColorsQuery as useQuery } from 'src/graphql/hooks'
import { ProjectBaseColorsQuery } from 'src/graphql/types/projectBaseColors'
import { useMountedRef } from 'src/hooks'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import {
  ProjectBaseColorResponse,
  useProjectBaseColorsResponse,
} from 'src/store/entities/projectBaseColor'

export const useProjectBaseColorsQuery = () => {
  const queryResult = useQuery()
  const { setProjectBaseColors } = useProjectBaseColorsResponse()
  const [loading, setLoading] = useState(true)
  const { mountedRef } = useMountedRef()

  useEffect(() => {
    setLoading(queryResult.loading)
  }, [queryResult.loading])

  useEffect(() => {
    if (!queryResult.data?.projectBaseColors) return
    if (loading) return
    if (!mountedRef.current) return

    const projectBaseColors = getNodesFromEdges<
      ProjectBaseColorResponse,
      ProjectBaseColorsQuery['projectBaseColors']
    >(queryResult.data.projectBaseColors)

    setProjectBaseColors(projectBaseColors)
  }, [loading, mountedRef, queryResult.data, setProjectBaseColors])

  return {
    refetch: queryResult.refetch,
    loading,
  }
}
