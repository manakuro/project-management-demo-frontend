import deepmerge from 'deepmerge'
import { Options, Query } from './type'

export const me = (
  options?: Options,
  deepMergeOptions?: deepmerge.Options,
): Query =>
  deepmerge<Query>(
    {
      me: {
        id: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
        email: 'manato.kuroda@example.com',
        image: '/images/cat_img.png',
        name: 'Manato Kuroda',
        createdAt: '2022-11-29T09:16:39+09:00',
        updatedAt: '2022-11-29T09:16:39+09:00',
        __typename: 'Me',
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
