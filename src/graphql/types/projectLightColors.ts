import type { ProjectLightColorsQuery } from 'src/graphql/types'

export type {
  ProjectLightColorsQuery,
  ProjectLightColorsQueryVariables,
} from 'src/graphql/types'
export type {
  ProjectLightColorsQueryHookResult,
  ProjectLightColorsLazyQueryHookResult,
} from 'src/graphql/hooks'

export type ProjectLightColorsResponse =
  ProjectLightColorsQuery['projectLightColors']
