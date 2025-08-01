import { useProjectIconsQuery as useQuery } from '@/graphql/hooks';
import type { ProjectIconsQuery } from '@/graphql/types/projectIcons';
import { getNodesFromEdges } from '@/shared/apollo/util';
import {
  type ProjectIconResponse,
  useProjectIconsResponse,
} from '@/store/entities/projectIcon';

export const useProjectIconsQuery = () => {
  const { setProjectIcons } = useProjectIconsResponse();

  const queryResult = useQuery({
    onCompleted: (data) => {
      const projectIcons = getNodesFromEdges<
        ProjectIconResponse,
        ProjectIconsQuery['projectIcons']
      >(data.projectIcons);

      setProjectIcons(projectIcons);
    },
  });

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  };
};
