import deepmerge from 'deepmerge'
import { Options, Query } from './type'

export const workspace = (
  options?: Options,
  deepMergeOptions?: deepmerge.Options,
): Query =>
  deepmerge<Query>(
    {
      workspace: {
        id: '0AD01GK0BWAQZYWRN2T89M5K2620Z',
        name: 'My Workspace',
        description: {
          content: [
            {
              content: [
                {
                  text: 'A Workspace is a collection of people that collaborate on projects and tasks. Workspaces can be used by any group of people and do not require a common company email domain.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'doc',
        },
        createdBy: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
        createdAt: '2022-11-29T09:16:39+09:00',
        updatedAt: '2022-11-29T09:16:39+09:00',
        __typename: 'Workspace',
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