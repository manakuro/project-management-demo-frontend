import deepmerge from 'deepmerge'
import { Options, Query } from './type'

export const favoriteWorkspaceIds = (
  options?: Options,
  deepMergeOptions?: deepmerge.Options,
): Query =>
  deepmerge<Query>(
    {
      favoriteWorkspaceIds: ['0AD01GK0BWAQZYWRN2T89M5K2620Z'],
      __typename: 'Query',
    },
    (options || {}) as Query,
    {
      arrayMerge(target: any[], source: any[]): any[] {
        if (!source.length) return source

        return [...target, ...source]
      },
      ...deepMergeOptions,
    },
  )
