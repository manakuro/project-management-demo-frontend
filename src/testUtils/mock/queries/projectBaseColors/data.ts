// Generated by `yarn new:queryMock`
import deepmerge from 'deepmerge'
import { projectBaseColors } from 'src/mock/queries/projectBaseColors'
import { Response, Query } from './type'

export const data = (
  options?: Response,
  deepMergeOptions?: deepmerge.Options,
): Query =>
  deepmerge<Query>(
    {
      ...projectBaseColors(),
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
