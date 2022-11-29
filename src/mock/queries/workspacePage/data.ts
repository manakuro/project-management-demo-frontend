import deepmerge from 'deepmerge'
import { Options, Query } from './type'

export const workspacePage = (
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
        projects: [
          {
            id: '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
            name: 'App Development',
            projectBaseColorId: '0AI01GK0BWARZDJ7DV0QC8D00VKEN',
            projectLightColorId: '0AJ01GK0BWASYFS2ABT0SKNJT7H04',
            projectIconId: '0AK01GK0BWAVC6X7D4HNHZ06N4ADE',
            description: {
              content: [
                {
                  content: [
                    {
                      text: 'Welcome to the App Development team! We’ll be using this project to track our progress on our Q1 product launch. Final ad designs are in the “Key Resources” section below. Use this form to submit new ideas! 😆',
                      type: 'text',
                    },
                  ],
                  type: 'paragraph',
                },
                {
                  type: 'paragraph',
                },
                {
                  type: 'paragraph',
                },
                {
                  type: 'paragraph',
                },
                {
                  type: 'paragraph',
                },
              ],
              type: 'doc',
            },
            descriptionTitle: "How we'll collaborate",
            teammateIds: [
              '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
              '0AC01GK0BWAQM2G89ZEQW6V2CG974',
              '0AC01GK0BWAQM2G89ZEQW6XCNRHWV',
            ],
            projectTeammates: [
              {
                id: '0AH01GK0BWAXJ1S3A8ZD03128ZZYF',
                isOwner: true,
                role: '',
                projectId: '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
                teammateId: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
                teammate: {
                  id: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
                  name: 'Manato Kuroda',
                  image: '/images/cat_img.png',
                  email: 'manato.kuroda@example.com',
                  createdAt: '2022-11-29T09:16:39+09:00',
                  updatedAt: '2022-11-29T09:16:39+09:00',
                  __typename: 'Teammate',
                },
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'ProjectTeammate',
              },
              {
                id: '0AH01GK0BWAXJ1S3A8ZD033SJMMXV',
                isOwner: false,
                role: '',
                projectId: '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
                teammateId: '0AC01GK0BWAQM2G89ZEQW6V2CG974',
                teammate: {
                  id: '0AC01GK0BWAQM2G89ZEQW6V2CG974',
                  name: 'Dan Abrahmov',
                  image: '/images/dan.jpg',
                  email: 'dan.abrahmov@example.com',
                  createdAt: '2022-11-29T09:16:39+09:00',
                  updatedAt: '2022-11-29T09:16:39+09:00',
                  __typename: 'Teammate',
                },
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'ProjectTeammate',
              },
              {
                id: '0AH01GK0BWAXJ1S3A8ZD036H4RMBP',
                isOwner: false,
                role: '',
                projectId: '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
                teammateId: '0AC01GK0BWAQM2G89ZEQW6XCNRHWV',
                teammate: {
                  id: '0AC01GK0BWAQM2G89ZEQW6XCNRHWV',
                  name: 'Kent Dodds',
                  image: '/images/kent.jpg',
                  email: 'kent.dodds@example.com',
                  createdAt: '2022-11-29T09:16:39+09:00',
                  updatedAt: '2022-11-29T09:16:39+09:00',
                  __typename: 'Teammate',
                },
                createdAt: '2022-11-29T09:16:39+09:00',
                updatedAt: '2022-11-29T09:16:39+09:00',
                __typename: 'ProjectTeammate',
              },
            ],
            dueDate: '2022-11-29T09:16:39+09:00',
            createdBy: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
            createdAt: '2022-11-29T09:16:39+09:00',
            updatedAt: '2022-11-29T09:27:12+09:00',
            __typename: 'Project',
          },
          {
            id: '0AG01GK0BWAWW1RDQ0KJJENA0ET1A',
            name: 'Marketing',
            projectBaseColorId: '0AI01GK0BWARZDJ7DV0QC8884CKJG',
            projectLightColorId: '0AJ01GK0BWASYFS2ABT0SKGZ30GK7',
            projectIconId: '0AK01GK0BWAVC6X7D4HNHYZQ2MHEH',
            description: {
              content: [
                {
                  content: [
                    {
                      attrs: {
                        mentionId: '',
                        mentionType: '',
                      },
                      text: 'Welcome to the Marketing team! We’ll be using this project to track our progress on our Q1 product launch. Final ad designs are in the “Key Resources” section below. Use this form to submit new ideas! 😆',
                      type: 'text',
                    },
                  ],
                  type: 'paragraph',
                },
                {
                  content: null,
                  type: 'paragraph',
                },
                {
                  content: null,
                  type: 'paragraph',
                },
                {
                  content: null,
                  type: 'paragraph',
                },
                {
                  content: null,
                  type: 'paragraph',
                },
              ],
              type: 'doc',
            },
            descriptionTitle: "How we'll collaborate",
            teammateIds: [],
            projectTeammates: [],
            dueDate: '2022-11-29T09:16:39+09:00',
            createdBy: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
            createdAt: '2022-11-29T09:16:39+09:00',
            updatedAt: '2022-11-29T09:16:39+09:00',
            __typename: 'Project',
          },
          {
            id: '0AG01GK0BWAWW1RDQ0KJJEPA0GCDW',
            name: 'Customer Success',
            projectBaseColorId: '0AI01GK0BWARZDJ7DV0QC7YB0ZKNN',
            projectLightColorId: '0AJ01GK0BWASYFS2ABT0SKDYG2T65',
            projectIconId: '0AK01GK0BWAVC6X7D4HNHYZQ2MHEH',
            description: {
              content: [
                {
                  content: [
                    {
                      attrs: {
                        mentionId: '',
                        mentionType: '',
                      },
                      text: 'Welcome to the Customer Success team! We’ll be using this project to track our progress on our Q1 product launch. Final ad designs are in the “Key Resources” section below. Use this form to submit new ideas! 😆',
                      type: 'text',
                    },
                  ],
                  type: 'paragraph',
                },
                {
                  content: null,
                  type: 'paragraph',
                },
                {
                  content: null,
                  type: 'paragraph',
                },
                {
                  content: null,
                  type: 'paragraph',
                },
                {
                  content: null,
                  type: 'paragraph',
                },
              ],
              type: 'doc',
            },
            descriptionTitle: "How we'll collaborate",
            teammateIds: [],
            projectTeammates: [],
            dueDate: '',
            createdBy: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
            createdAt: '2022-11-29T09:16:39+09:00',
            updatedAt: '2022-11-29T09:16:39+09:00',
            __typename: 'Project',
          },
        ],
        workspaceTeammates: [
          {
            id: '0AL01GK0BWAY5N0HDXNXKVJGRF0CD',
            isOwner: true,
            role: '',
            workspaceId: '0AD01GK0BWAQZYWRN2T89M5K2620Z',
            teammateId: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
            teammate: {
              id: '0AC01GK0BWAQM2G89ZEQW6TVYJC17',
              name: 'Manato Kuroda',
              image: '/images/cat_img.png',
              email: 'manato.kuroda@example.com',
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'Teammate',
            },
            createdAt: '2022-11-29T09:16:39+09:00',
            updatedAt: '2022-11-29T09:16:39+09:00',
            __typename: 'WorkspaceTeammate',
          },
          {
            id: '0AL01GK0BWAY5N0HDXNXKVKC8KJAQ',
            isOwner: false,
            role: '',
            workspaceId: '0AD01GK0BWAQZYWRN2T89M5K2620Z',
            teammateId: '0AC01GK0BWAQM2G89ZEQW6V2CG974',
            teammate: {
              id: '0AC01GK0BWAQM2G89ZEQW6V2CG974',
              name: 'Dan Abrahmov',
              image: '/images/dan.jpg',
              email: 'dan.abrahmov@example.com',
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'Teammate',
            },
            createdAt: '2022-11-29T09:16:39+09:00',
            updatedAt: '2022-11-29T09:16:39+09:00',
            __typename: 'WorkspaceTeammate',
          },
          {
            id: '0AL01GK0BWAY5N0HDXNXKVMPEZJNX',
            isOwner: false,
            role: '',
            workspaceId: '0AD01GK0BWAQZYWRN2T89M5K2620Z',
            teammateId: '0AC01GK0BWAQM2G89ZEQW6XCNRHWV',
            teammate: {
              id: '0AC01GK0BWAQM2G89ZEQW6XCNRHWV',
              name: 'Kent Dodds',
              image: '/images/kent.jpg',
              email: 'kent.dodds@example.com',
              createdAt: '2022-11-29T09:16:39+09:00',
              updatedAt: '2022-11-29T09:16:39+09:00',
              __typename: 'Teammate',
            },
            createdAt: '2022-11-29T09:16:39+09:00',
            updatedAt: '2022-11-29T09:16:39+09:00',
            __typename: 'WorkspaceTeammate',
          },
        ],
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
