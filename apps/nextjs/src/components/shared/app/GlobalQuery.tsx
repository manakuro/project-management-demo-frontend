import type React from 'react';
import { PageLoader } from 'src/components/ui/molecules';
import {
  useFavoriteProjectIdsQuery,
  useFavoriteWorkspaceIdsQuery,
  useMeQuery,
  useProjectBaseColorsQuery,
  useProjectIconsQuery,
  useProjectLightColorsQuery,
  useProjectsQuery,
  useTaskPrioritiesQuery,
  useTeammateTaskTabStatusQuery,
  useWorkspaceQuery,
} from 'src/hooks/queries/entities';
import { useMe } from 'src/store/entities/me';

export const GlobalQuery: React.FCWithChildren = (props) => {
  useTaskPrioritiesQuery();
  useProjectsQuery();
  useProjectBaseColorsQuery();
  useProjectLightColorsQuery();
  useProjectIconsQuery();
  useFavoriteWorkspaceIdsQuery();
  useWorkspaceQuery();
  useMeQuery();
  useFavoriteProjectIdsQuery();
  useTeammateTaskTabStatusQuery();

  const { me } = useMe();

  if (!me.id) return <PageLoader />;

  return props.children as React.ReactElement;
};
