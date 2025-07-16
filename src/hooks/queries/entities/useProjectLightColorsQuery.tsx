import { useProjectLightColorsQuery as useQuery } from 'src/graphql/hooks'
import type { ProjectLightColorsQuery } from 'src/graphql/types/projectLightColors'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import {
  type ProjectLightColorResponse,
  useProjectLightColorsResponse,
} from 'src/store/entities/projectLightColor'

export const useProjectLightColorsQuery = () => {
  const { setProjectLightColors } = useProjectLightColorsResponse()

  const queryResult = useQuery({
    onCompleted: (data) => {
      const projectBaseColors = getNodesFromEdges<
        ProjectLightColorResponse,
        ProjectLightColorsQuery['projectLightColors']
      >(data.projectLightColors)

      setProjectLightColors(projectBaseColors)
    },
  })

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  }
}
