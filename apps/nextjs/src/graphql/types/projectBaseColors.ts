import type { ProjectBaseColorsQuery } from '@/graphql/types';

export type {
  ProjectBaseColorsQuery,
  ProjectBaseColorsQueryVariables,
} from '@/graphql/types';
export type {
  ProjectBaseColorsQueryHookResult,
  ProjectBaseColorsLazyQueryHookResult,
} from '@/graphql/hooks';

export type ProjectBaseColorsResponse =
  ProjectBaseColorsQuery['projectBaseColors'];
