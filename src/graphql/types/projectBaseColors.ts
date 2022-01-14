import { ProjectBaseColorsQuery } from 'src/graphql/types'

export type {
  ProjectBaseColorsQuery,
  ProjectBaseColorsQueryVariables,
} from 'src/graphql/types'
export type {
  ProjectBaseColorsQueryHookResult,
  ProjectBaseColorsLazyQueryHookResult,
} from 'src/graphql/hooks'

export type ProjectBaseColorsResponse =
  ProjectBaseColorsQuery['projectBaseColors']
