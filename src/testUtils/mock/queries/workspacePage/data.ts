// Generated by `yarn new:queryMock`
import deepmerge from 'deepmerge'
import { workspacePage } from 'src/mock/queries/workspacePage'
import { Response, Query } from './type'

export const data = (
  options?: Response,
  deepMergeOptions?: deepmerge.Options,
): Query =>
  deepmerge<Query>(
    {
      ...workspacePage(),
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