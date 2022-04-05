import { useProjectIconsQuery as useQuery } from 'src/graphql/hooks'
import { ProjectIconsQuery } from 'src/graphql/types/projectIcons'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import {
  ProjectIconResponse,
  useProjectIconsResponse,
} from 'src/store/entities/projectIcon'

export const useProjectIconsQuery = () => {
  const { setProjectIcons } = useProjectIconsResponse()

  const queryResult = useQuery({
    onCompleted: (data) => {
      const projectIcons = getNodesFromEdges<
        ProjectIconResponse,
        ProjectIconsQuery['projectIcons']
      >(data.projectIcons)

      setProjectIcons(projectIcons)
    },
  })

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  }
}
