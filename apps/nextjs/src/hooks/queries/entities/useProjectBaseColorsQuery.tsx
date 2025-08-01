import { useProjectBaseColorsQuery as useQuery } from '@/graphql/hooks';
import type { ProjectBaseColorsQuery } from '@/graphql/types/projectBaseColors';
import { getNodesFromEdges } from '@/shared/apollo/util';
import {
  type ProjectBaseColorResponse,
  useProjectBaseColorsResponse,
} from '@/store/entities/projectBaseColor';

export const useProjectBaseColorsQuery = () => {
  const { setProjectBaseColors } = useProjectBaseColorsResponse();

  const queryResult = useQuery({
    onCompleted: (data) => {
      const projectBaseColors = getNodesFromEdges<
        ProjectBaseColorResponse,
        ProjectBaseColorsQuery['projectBaseColors']
      >(data.projectBaseColors);

      setProjectBaseColors(projectBaseColors);
    },
  });

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  };
};
