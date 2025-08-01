import { useProjectsQuery as useQuery } from '@/graphql/hooks';
import type { ProjectsQuery } from '@/graphql/types/projects';
import { getNodesFromEdges } from '@/shared/apollo/util';
import {
  type ProjectResponse,
  useProjectResponse,
} from '@/store/entities/project';

export const useProjectsQuery = () => {
  const { setProjects } = useProjectResponse();

  const queryResult = useQuery({
    onCompleted: (data) => {
      const projects = getNodesFromEdges<
        ProjectResponse,
        ProjectsQuery['projects']
      >(data.projects);

      setProjects(projects);
    },
  });

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  };
};
