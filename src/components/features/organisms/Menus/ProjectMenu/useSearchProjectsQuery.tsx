import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';
import { useProjectsLazyQuery } from 'src/graphql/hooks';
import type { ProjectResponse, ProjectsQuery } from 'src/graphql/types/project';
import { getNodesFromEdges } from 'src/shared/apollo/util';
import type { Project } from 'src/store/entities/project';
import { useWorkspace } from 'src/store/entities/workspace';

const key = (str: string) =>
  `src/components/organisms/Menus/ProjectMenu/useSearchProjectsQuery/${str}`;

const searchProjectsQueryState = atom<{
  loading: boolean;
  projects: Project[];
}>({
  key: key('searchProjectsQueryState'),
  default: {
    loading: false,
    projects: [],
  },
});

type Props = {
  queryText: string;
};
export const useSearchProjectsQuery = () => {
  const [state, setState] = useRecoilState(searchProjectsQueryState);
  const [refetchQuery] = useProjectsLazyQuery();
  const { workspace } = useWorkspace();

  const refetch = useCallback(
    async (props: Props) => {
      setState((s) => ({ ...s, loading: true }));
      const res = await refetchQuery({
        variables: {
          where: {
            workspaceID: workspace.id,
            nameContainsFold: props.queryText,
          },
        },
      });

      const projects = getNodesFromEdges<
        ProjectResponse,
        ProjectsQuery['projects']
      >(res.data?.projects);

      setState((s) => ({ ...s, projects, loading: false }));
      return projects;
    },
    [refetchQuery, setState, workspace.id],
  );

  return {
    refetch,
    ...state,
  };
};
