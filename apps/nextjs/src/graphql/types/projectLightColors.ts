import type { ProjectLightColorsQuery } from '@/graphql/types';

export type {
  ProjectLightColorsQuery,
  ProjectLightColorsQueryVariables,
} from '@/graphql/types';
export type {
  ProjectLightColorsQueryHookResult,
  ProjectLightColorsLazyQueryHookResult,
} from '@/graphql/hooks';

export type ProjectLightColorsResponse =
  ProjectLightColorsQuery['projectLightColors'];
