import deepmerge from 'deepmerge'
import { Options, Query } from './type'

export const projectBaseColors = (
  options?: Options,
  deepMergeOptions?: deepmerge.Options,
): Query =>
  deepmerge<Query>(
    {
      projectBaseColors: {
        edges: [
          {
            node: {
              id: '0AI01GK0BWARZDJ7DV0QC7T70B0GK',
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
              __typename: 'ProjectBaseColor',
            },
            __typename: 'ProjectBaseColorEdge',
          },
          {
            node: {
              id: '0AI01GK0BWARZDJ7DV0QC7WHTRJBK',
              color: {
                id: '0AE01GK0BWANSFX67CEBWC6JABWS3',
                name: 'red.400',
                color: 'red.400',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'ProjectBaseColor',
            },
            __typename: 'ProjectBaseColorEdge',
          },
          {
            node: {
              id: '0AI01GK0BWARZDJ7DV0QC7YB0ZKNN',
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
              __typename: 'ProjectBaseColor',
            },
            __typename: 'ProjectBaseColorEdge',
          },
          {
            node: {
              id: '0AI01GK0BWARZDJ7DV0QC80Z7HF2N',
              color: {
                id: '0AE01GK0BWANSFX67CEBWDAQJPCB0',
                name: 'yellow.400',
                color: 'yellow.400',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'ProjectBaseColor',
            },
            __typename: 'ProjectBaseColorEdge',
          },
          {
            node: {
              id: '0AI01GK0BWARZDJ7DV0QC84VSPT33',
              color: {
                id: '0AE01GK0BWANSFX67CEBWDSWAKF69',
                name: 'green.400',
                color: 'green.400',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'ProjectBaseColor',
            },
            __typename: 'ProjectBaseColorEdge',
          },
          {
            node: {
              id: '0AI01GK0BWARZDJ7DV0QC8884CKJG',
              color: {
                id: '0AE01GK0BWANSFX67CEBWEF5YTKPB',
                name: 'teal.400',
                color: 'teal.400',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'ProjectBaseColor',
            },
            __typename: 'ProjectBaseColorEdge',
          },
          {
            node: {
              id: '0AI01GK0BWARZDJ7DV0QC8B13NFGK',
              color: {
                id: '0AE01GK0BWANSFX67CEBWF16FP0K7',
                name: 'blue.400',
                color: 'blue.400',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'ProjectBaseColor',
            },
            __typename: 'ProjectBaseColorEdge',
          },
          {
            node: {
              id: '0AI01GK0BWARZDJ7DV0QC8B6Z70N0',
              color: {
                id: '0AE01GK0BWANSFX67CEBWFGEHJK4R',
                name: 'cyan.400',
                color: 'cyan.400',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'ProjectBaseColor',
            },
            __typename: 'ProjectBaseColorEdge',
          },
          {
            node: {
              id: '0AI01GK0BWARZDJ7DV0QC8C22272J',
              color: {
                id: '0AE01GK0BWANSFX67CEBWG59362BG',
                name: 'purple.400',
                color: 'purple.400',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'ProjectBaseColor',
            },
            __typename: 'ProjectBaseColorEdge',
          },
          {
            node: {
              id: '0AI01GK0BWARZDJ7DV0QC8D00VKEN',
              color: {
                id: '0AE01GK0BWANSFX67CEBWGNHY5YHZ',
                name: 'pink.400',
                color: 'pink.400',
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'Color',
              },
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'ProjectBaseColor',
            },
            __typename: 'ProjectBaseColorEdge',
          },
        ],
        __typename: 'ProjectBaseColorConnection',
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
