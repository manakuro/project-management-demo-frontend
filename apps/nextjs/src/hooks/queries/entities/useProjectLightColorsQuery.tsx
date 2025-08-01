import { useProjectLightColorsQuery as useQuery } from '@/graphql/hooks';
import type { ProjectLightColorsQuery } from '@/graphql/types/projectLightColors';
import { getNodesFromEdges } from '@/shared/apollo/util';
import {
  type ProjectLightColorResponse,
  useProjectLightColorsResponse,
} from '@/store/entities/projectLightColor';

export const useProjectLightColorsQuery = () => {
  const { setProjectLightColors } = useProjectLightColorsResponse();

  const queryResult = useQuery({
    onCompleted: (data) => {
      const projectBaseColors = getNodesFromEdges<
        ProjectLightColorResponse,
        ProjectLightColorsQuery['projectLightColors']
      >(data.projectLightColors);

      setProjectLightColors(projectBaseColors);
    },
  });

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  };
};
