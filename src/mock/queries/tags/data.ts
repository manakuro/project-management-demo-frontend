import deepmerge from 'deepmerge'
import { Options, Query } from './type'

export const tags = (
  options?: Options,
  deepMergeOptions?: deepmerge.Options,
): Query =>
  deepmerge<Query>(
    {
      tags: {
        edges: [
          {
            node: {
              id: '0BE01GK0BWB0ZRSHP6XPRW8D8G8KA',
              name: 'Design',
              color: {
                id: '0AE01GK0BWANSFX67CEBWBN9SAHVK',
                name: 'gray.400',
                color: 'gray.400',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'Tag',
            },
            __typename: 'TagEdge',
          },
          {
            node: {
              id: '0BE01GK0BWB0ZRSHP6XPRWB91MDHP',
              name: 'Development',
              color: {
                id: '0AE01GK0BWANSFX67CEBWCVFMWZC8',
                name: 'orange.400',
                color: 'orange.400',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'Tag',
            },
            __typename: 'TagEdge',
          },
        ],
        __typename: 'TagConnection',
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
