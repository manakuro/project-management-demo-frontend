import deepmerge from 'deepmerge'
import { Options, Query } from './type'

export const taskPriorities = (
  options?: Options,
  deepMergeOptions?: deepmerge.Options,
): Query =>
  deepmerge<Query>(
    {
      taskPriorities: {
        edges: [
          {
            node: {
              id: '0AZ01GK0BWB0B1Y7H4B6YANXHPAN7',
              name: 'Low',
              priorityType: 'LOW',
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
              __typename: 'TaskPriority',
            },
            __typename: 'TaskPriorityEdge',
          },
          {
            node: {
              id: '0AZ01GK0BWB0B1Y7H4B6YASV90HW7',
              name: 'Medium',
              priorityType: 'MEDIUM',
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
              __typename: 'TaskPriority',
            },
            __typename: 'TaskPriorityEdge',
          },
          {
            node: {
              id: '0AZ01GK0BWB0B1Y7H4B6YATMY3M0S',
              name: 'High',
              priorityType: 'HIGH',
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
              __typename: 'TaskPriority',
            },
            __typename: 'TaskPriorityEdge',
          },
        ],
        __typename: 'TaskPriorityConnection',
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
