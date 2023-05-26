// Generated by `yarn new:mutationMock`
import deepmerge from 'deepmerge'
import { Response, Mutation } from './type'

export const data = (
  options?: Response,
  deepMergeOptions?: deepmerge.Options,
): Mutation =>
  deepmerge<Mutation>({}, (options || {}) as Mutation, {
    arrayMerge(target: any[], source: any[]): any[] {
      if (!source.length) return source

      return [...target, ...source]
    },
    ...deepMergeOptions,
  })