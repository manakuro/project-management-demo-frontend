import deepmerge from 'deepmerge'
import { Response, Query } from './type'

export const projects = (
  options?: Response,
  deepMergeOptions?: deepmerge.Options,
): Query =>
  deepmerge<Query>(
    {
      projects: {
        edges: [
          {
            node: {
              id: '0AG01GF9ZGBYJM9MKV30SNVZE10HV',
              name: 'App Development',
              projectBaseColorId: '0AI01GF9ZGBDY8AYPFK3FBV5DMY8Q',
              projectLightColorId: '0AJ01GF9ZGBJ03P0145BSRV9PNNSJ',
              projectIconId: '0AK01GF9ZGBR4F2ZYZ427KC9AEZYQ',
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
                    content: [
                      {
                        text: 'Welcome to the App Development team! We’ll be using this project to track our progress on our Q1 product launch. Final ad designs are in the “Key Resources” section below. ',
                        type: 'text',
                      },
                      {
                        marks: [
                          {
                            type: 'bold',
                          },
                          {
                            type: 'italic',
                          },
                          {
                            type: 'underline',
                          },
                        ],
                        text: 'Use',
                        type: 'text',
                      },
                      {
                        text: ' this form to submit new ideas! 😆',
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
                    attrs: {
                      start: 1,
                      type: 'bullet',
                    },
                    content: [
                      {
                        content: [
                          {
                            content: [
                              {
                                text: 'test',
                                type: 'text',
                              },
                            ],
                            type: 'paragraph',
                          },
                          {
                            attrs: {
                              start: 1,
                              type: 'ordered',
                            },
                            content: [
                              {
                                content: [
                                  {
                                    content: [
                                      {
                                        text: 'test',
                                        type: 'text',
                                      },
                                    ],
                                    type: 'paragraph',
                                  },
                                ],
                                type: 'listItem',
                              },
                            ],
                            type: 'list',
                          },
                        ],
                        type: 'listItem',
                      },
                      {
                        content: [
                          {
                            content: [
                              {
                                text: 'test',
                                type: 'text',
                              },
                            ],
                            type: 'paragraph',
                          },
                        ],
                        type: 'listItem',
                      },
                      {
                        content: [
                          {
                            type: 'paragraph',
                          },
                        ],
                        type: 'listItem',
                      },
                    ],
                    type: 'list',
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
                '0AC01GF9ZGB7W1P0G4DZS22JZHC3G',
                '0AC01GF9ZGB7W1P0G4DZS25NB547H',
                '0AC01GF9ZGB7W1P0G4DZS28AB3880',
              ],
              projectTeammates: [
                {
                  id: '0AH01GF9ZGC0T279SX57Y9K1XSZYE',
                  isOwner: true,
                  role: '',
                  projectId: '0AG01GF9ZGBYJM9MKV30SNVZE10HV',
                  teammateId: '0AC01GF9ZGB7W1P0G4DZS22JZHC3G',
                  teammate: {
                    id: '0AC01GF9ZGB7W1P0G4DZS22JZHC3G',
                    name: 'Manato Kuroda',
                    image: '/images/cat_img.png',
                    email: 'manato.kuroda@example.com',
                    createdAt: '2022-10-14T09:50:01+09:00',
                    updatedAt: '2022-10-14T09:50:01+09:00',
                    __typename: 'Teammate',
                  },
                  createdAt: '2022-10-14T09:50:01+09:00',
                  updatedAt: '2022-11-23T15:55:19+09:00',
                  __typename: 'ProjectTeammate',
                },
                {
                  id: '0AH01GF9ZGC0T279SX57Y9K76KST1',
                  isOwner: false,
                  role: 'Role',
                  projectId: '0AG01GF9ZGBYJM9MKV30SNVZE10HV',
                  teammateId: '0AC01GF9ZGB7W1P0G4DZS25NB547H',
                  teammate: {
                    id: '0AC01GF9ZGB7W1P0G4DZS25NB547H',
                    name: 'Dan Abrahmov',
                    image: '/images/dan.jpg',
                    email: 'dan.abrahmov@example.com',
                    createdAt: '2022-10-14T09:50:01+09:00',
                    updatedAt: '2022-10-14T09:50:01+09:00',
                    __typename: 'Teammate',
                  },
                  createdAt: '2022-10-14T09:50:01+09:00',
                  updatedAt: '2022-11-23T15:55:05+09:00',
                  __typename: 'ProjectTeammate',
                },
                {
                  id: '0AH01GF9ZGC0T279SX57Y9MHXC58F',
                  isOwner: false,
                  role: '',
                  projectId: '0AG01GF9ZGBYJM9MKV30SNVZE10HV',
                  teammateId: '0AC01GF9ZGB7W1P0G4DZS28AB3880',
                  teammate: {
                    id: '0AC01GF9ZGB7W1P0G4DZS28AB3880',
                    name: 'Kent Dodds',
                    image: '/images/kent.jpg',
                    email: 'kent.dodds@example.com',
                    createdAt: '2022-10-14T09:50:01+09:00',
                    updatedAt: '2022-10-14T09:50:01+09:00',
                    __typename: 'Teammate',
                  },
                  createdAt: '2022-10-14T09:50:01+09:00',
                  updatedAt: '2022-11-23T15:55:19+09:00',
                  __typename: 'ProjectTeammate',
                },
              ],
              dueDate: '2022-10-28T23:59:59+09:00',
              createdBy: '0AC01GF9ZGB7W1P0G4DZS22JZHC3G',
              createdAt: '2022-10-14T09:50:01+09:00',
              updatedAt: '2022-11-24T14:00:05+09:00',
              __typename: 'Project',
            },
            __typename: 'ProjectEdge',
          },
          {
            node: {
              id: '0AG01GF9ZGBYJM9MKV30SNX1YAZZ9',
              name: 'Marketing',
              projectBaseColorId: '0AI01GF9ZGBDY8AYPFK3FBNRTA42F',
              projectLightColorId: '0AJ01GF9ZGBJ03P0145BSRGYTRY0N',
              projectIconId: '0AK01GF9ZGBR4F2ZYZ427JHT0K0VW',
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
              dueDate: '2022-10-14T09:50:01+09:00',
              createdBy: '0AC01GF9ZGB7W1P0G4DZS22JZHC3G',
              createdAt: '2022-10-14T09:50:01+09:00',
              updatedAt: '2022-11-23T15:49:57+09:00',
              __typename: 'Project',
            },
            __typename: 'ProjectEdge',
          },
          {
            node: {
              id: '0AG01GF9ZGBYJM9MKV30SNY0WPG91',
              name: 'Customer Success',
              projectBaseColorId: '0AI01GF9ZGBDY8AYPFK3FBBBGHHJJ',
              projectLightColorId: '0AJ01GF9ZGBJ03P0145BSR96E1S4R',
              projectIconId: '0AK01GF9ZGBR4F2ZYZ427J8846P7Z',
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
              createdBy: '0AC01GF9ZGB7W1P0G4DZS22JZHC3G',
              createdAt: '2022-10-14T09:50:01+09:00',
              updatedAt: '2022-10-14T09:50:01+09:00',
              __typename: 'Project',
            },
            __typename: 'ProjectEdge',
          },
        ],
        __typename: 'ProjectConnection',
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
