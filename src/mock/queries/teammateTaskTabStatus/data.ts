import deepmerge from 'deepmerge'
import { Options, Query } from './type'

export const teammateTaskTabStatus = (
  options?: Options,
  deepMergeOptions?: deepmerge.Options,
): Query =>
  deepmerge<Query>(
    {
      teammateTaskTabStatus: {
        id: '0AO01GK0BWBJKMQZ750XFNNMRMNFG',
        teammateId: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
        workspaceId: '0AD01GK0BWAQZYWRN2T89M5K2620Z',
        statusCode: 'LIST',
        createdAt: '2022-11-29T09:16:40+09:00',
        updatedAt: '2022-11-29T09:16:40+09:00',
        __typename: 'TeammateTaskTabStatus',
      },
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
