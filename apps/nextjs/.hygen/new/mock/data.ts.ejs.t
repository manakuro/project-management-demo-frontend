---
to: src/mock/queries/<%= fileName %>/data.ts
unless_exists: true
---
import deepmerge from 'deepmerge'
import { Options, Query } from './type'

export const <%= queryTypeName %> = (options?: Options, deepMergeOptions?: deepmerge.Options): Query =>
  deepmerge<Query>(
    <%- data %>,
    (options || {}) as Query,
    {
      arrayMerge(target: any[], source: any[]): any[] {
        if (!source.length) return source;

        return [...target, ...source];
      },
      ...deepMergeOptions,
    }
  )
