import { useProjectBaseColorsQuery as useQuery } from 'src/graphql/hooks'
import { ProjectBaseColorsQuery } from 'src/graphql/types/projectBaseColors'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import {
  ProjectBaseColorResponse,
  useProjectBaseColorsResponse,
} from 'src/store/entities/projectBaseColor'

export const useProjectBaseColorsQuery = () => {
  const { setProjectBaseColors } = useProjectBaseColorsResponse()

  const queryResult = useQuery({
    onCompleted: (data) => {
      const projectBaseColors = getNodesFromEdges<
        ProjectBaseColorResponse,
        ProjectBaseColorsQuery['projectBaseColors']
      >(data.projectBaseColors)

      setProjectBaseColors(projectBaseColors)
    },
  })

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  }
}
