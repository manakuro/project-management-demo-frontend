import deepmerge from 'deepmerge'
import { Options, Query } from './type'

export const task = (
  options?: Options,
  deepMergeOptions?: deepmerge.Options,
): Query =>
  deepmerge<Query>({}, (options || {}) as Query, {
    arrayMerge(target: any[], source: any[]): any[] {
      if (!source.length) return source

      return [...target, ...source]
    },
    ...deepMergeOptions,
  })
