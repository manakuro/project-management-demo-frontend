import deepmerge from 'deepmerge'
import { Options, Query } from './type'

export const favoriteProjectIds = (
  options?: Options,
  deepMergeOptions?: deepmerge.Options,
): Query =>
  deepmerge<Query>(
    {
      favoriteProjectIds: [
        '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
        '0AG01GK0BWAWW1RDQ0KJJENA0ET1A',
      ],
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
