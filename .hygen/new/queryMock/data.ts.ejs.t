---
to: src/testUtils/mock/queries/<%= fileName %>/data.ts
unless_exists: true
---
// Generated by `yarn new:queryMock`
import deepmerge from 'deepmerge'
import { Response, Query } from './type'

export const data = (options?: Response, deepMergeOptions?: deepmerge.Options): Query =>
  deepmerge<Query>(
    {},
    (options || {}) as Query,
    {
      arrayMerge(target: any[], source: any[]): any[] {
        if (!source.length) return source;

        return [...target, ...source];
      },
      ...deepMergeOptions,
    }
  )
