import deepmerge from 'deepmerge'
import { Options, Query } from './type'

export const projectLightColors = (
  options?: Options,
  deepMergeOptions?: deepmerge.Options,
): Query =>
  deepmerge<Query>(
    {
      projectLightColors: {
        edges: [
          {
            node: {
              id: '0AJ01GK0BWASYFS2ABT0SKCW17H2G',
              color: {
                id: '0AE01GK0BWANSFX67CEBWBJ84H48A',
                name: 'gray.200',
                color: 'gray.200',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'ProjectLightColor',
            },
            __typename: 'ProjectLightColorEdge',
          },
          {
            node: {
              id: '0AJ01GK0BWASYFS2ABT0SKD2A00AF',
              color: {
                id: '0AE01GK0BWANSFX67CEBWC21R8RRS',
                name: 'red.200',
                color: 'red.200',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'ProjectLightColor',
            },
            __typename: 'ProjectLightColorEdge',
          },
          {
            node: {
              id: '0AJ01GK0BWASYFS2ABT0SKDYG2T65',
              color: {
                id: '0AE01GK0BWANSFX67CEBWCSJ605XC',
                name: 'orange.200',
                color: 'orange.200',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'ProjectLightColor',
            },
            __typename: 'ProjectLightColorEdge',
          },
          {
            node: {
              id: '0AJ01GK0BWASYFS2ABT0SKEJ0ZYJM',
              color: {
                id: '0AE01GK0BWANSFX67CEBWD5JWXP9H',
                name: 'yellow.200',
                color: 'yellow.200',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'ProjectLightColor',
            },
            __typename: 'ProjectLightColorEdge',
          },
          {
            node: {
              id: '0AJ01GK0BWASYFS2ABT0SKF9GK7V8',
              color: {
                id: '0AE01GK0BWANSFX67CEBWDPH21FTB',
                name: 'green.200',
                color: 'green.200',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'ProjectLightColor',
            },
            __typename: 'ProjectLightColorEdge',
          },
          {
            node: {
              id: '0AJ01GK0BWASYFS2ABT0SKGZ30GK7',
              color: {
                id: '0AE01GK0BWANSFX67CEBWED6KT70Q',
                name: 'teal.200',
                color: 'teal.200',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'ProjectLightColor',
            },
            __typename: 'ProjectLightColorEdge',
          },
          {
            node: {
              id: '0AJ01GK0BWASYFS2ABT0SKK7PR3EZ',
              color: {
                id: '0AE01GK0BWANSFX67CEBWEWKAY9WK',
                name: 'blue.200',
                color: 'blue.200',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'ProjectLightColor',
            },
            __typename: 'ProjectLightColorEdge',
          },
          {
            node: {
              id: '0AJ01GK0BWASYFS2ABT0SKKERECJD',
              color: {
                id: '0AE01GK0BWANSFX67CEBWFD3ZT1GE',
                name: 'cyan.200',
                color: 'cyan.200',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'ProjectLightColor',
            },
            __typename: 'ProjectLightColorEdge',
          },
          {
            node: {
              id: '0AJ01GK0BWASYFS2ABT0SKN8EVFH7',
              color: {
                id: '0AE01GK0BWANSFX67CEBWG332CQ5X',
                name: 'purple.200',
                color: 'purple.200',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'ProjectLightColor',
            },
            __typename: 'ProjectLightColorEdge',
          },
          {
            node: {
              id: '0AJ01GK0BWASYFS2ABT0SKNJT7H04',
              color: {
                id: '0AE01GK0BWANSFX67CEBWGJWY198Y',
                name: 'pink.200',
                color: 'pink.200',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'ProjectLightColor',
            },
            __typename: 'ProjectLightColorEdge',
          },
        ],
        __typename: 'ProjectLightColorConnection',
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
