import { useProjectsQuery as useQuery } from 'src/graphql/hooks'
import type { ProjectsQuery } from 'src/graphql/types/projects'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import {
  type ProjectResponse,
  useProjectResponse,
} from 'src/store/entities/project'

export const useProjectsQuery = () => {
  const { setProjects } = useProjectResponse()

  const queryResult = useQuery({
    onCompleted: (data) => {
      const projects = getNodesFromEdges<
        ProjectResponse,
        ProjectsQuery['projects']
      >(data.projects)

      setProjects(projects)
    },
  })

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  }
}
