import { useEffect, useState } from 'react'
import { useProjectLightColorsQuery as useQuery } from 'src/graphql/hooks'
import { ProjectLightColorsQuery } from 'src/graphql/types/projectLightColors'
import { useMountedRef } from 'src/hooks'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import {
  ProjectLightColorResponse,
  useProjectLightColorsResponse,
} from 'src/store/entities/projectLightColors'

export const useProjectLightColorsQuery = () => {
  const queryResult = useQuery()
  const { setProjectLightColors } = useProjectLightColorsResponse()
  const [loading, setLoading] = useState(true)
  const { mountedRef } = useMountedRef()

  useEffect(() => {
    setLoading(queryResult.loading)
  }, [queryResult.loading])

  useEffect(() => {
    if (!queryResult.data?.projectLightColors) return
    if (loading) return
    if (!mountedRef.current) return

    const projectBaseColors = getNodesFromEdges<
      ProjectLightColorResponse,
      ProjectLightColorsQuery['projectLightColors']
    >(queryResult.data.projectLightColors)

    setProjectLightColors(projectBaseColors)
  }, [loading, mountedRef, queryResult.data, setProjectLightColors])

  return {
    refetch: queryResult.refetch,
    loading,
  }
}
