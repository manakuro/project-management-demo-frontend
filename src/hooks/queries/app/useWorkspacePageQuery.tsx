import { useCallback, useEffect, useState } from 'react'
import { useMountedRef } from 'src/hooks'
import { dateFns } from 'src/shared/dateFns'
import {
  useWorkspaceResponse,
  WorkspaceResponse,
} from 'src/store/app/workspace'
import { teammates } from 'src/store/entities/teammates/data'

type Props = {
  lazy?: boolean
}

export const useWorkspacePageQuery = (props?: Props) => {
  const [loading, setLoading] = useState(true)
  const { setWorkspace } = useWorkspaceResponse()
  const { mountedRef } = useMountedRef()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return
      setLoading(true)
      const res = await fetch()
      setWorkspace(res)
      setLoading(false)
    })()
  }, [props?.lazy, setWorkspace])

  const refetch = useCallback(async () => {
    setLoading(true)
    const res = await fetch()
    if (mountedRef.current) {
      setWorkspace(res)
    }
  }, [mountedRef, setWorkspace])

  return {
    refetch,
    loading,
  }
}

const fetch = (): Promise<WorkspaceResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        workspace: {
          id: '1',
          name: 'My Workspace',
          description: 'My Workspace description',
          createdBy: '1',
          createdAt: '',
          updatedAt: '',
        },
        workspaceTeammates: [
          {
            id: '1',
            teammateId: teammates.manato.id,
            workspaceId: '1',
            name: teammates.manato.name,
            image: teammates.manato.image,
            email: teammates.manato.email,
            isOwner: true,
            role: '',
            createdAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
            updatedAt: '',
          },
          {
            id: '2',
            teammateId: teammates.dan.id,
            workspaceId: '1',
            name: teammates.dan.name,
            image: teammates.dan.image,
            email: teammates.dan.email,
            isOwner: false,
            role: '',
            createdAt: new Date(dateFns.subDays(new Date(), 4)).toISOString(),
            updatedAt: '',
          },
          {
            id: '5',
            teammateId: teammates.kent.id,
            workspaceId: '1',
            name: teammates.kent.name,
            image: teammates.kent.image,
            email: teammates.kent.email,
            isOwner: false,
            role: '',
            createdAt: new Date(dateFns.subDays(new Date(), 3)).toISOString(),
            updatedAt: '',
          },
        ],
        projects: [
          {
            id: '1',
            name: 'Asana',
            color: {
              id: '10',
              name: 'pink',
              color: 'pink.400',
            },
            icon: {
              id: '4',
            },
            teammates: [
              {
                id: '1',
                teammateId: teammates.manato.id,
                projectId: '1',
                name: teammates.manato.name,
                image: teammates.manato.image,
                email: teammates.manato.email,
                isOwner: true,
                role: '',
                createdAt: new Date(
                  dateFns.subDays(new Date(), 5),
                ).toISOString(),
                updatedAt: '',
              },
              {
                id: '2',
                teammateId: teammates.dan.id,
                projectId: '1',
                name: teammates.dan.name,
                image: teammates.dan.image,
                email: teammates.dan.email,
                isOwner: false,
                role: '',
                createdAt: new Date(
                  dateFns.subDays(new Date(), 4),
                ).toISOString(),
                updatedAt: '',
              },
            ],
            description: JSON.stringify(
              {
                type: 'doc',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'Welcome to the Marketing team! We’ll be using this project to track our progress on our Q1 product launch. Final ad designs are in the “Key Resources” section below. Use this form to submit new ideas!',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                  },
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'Project Owner: ',
                      },
                      {
                        type: 'mention',
                        attrs: {
                          mentionId: '1',
                          mentionType: '1',
                        },
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'Tech Lead:',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'mention',
                        attrs: {
                          mentionId: '2',
                          mentionType: '1',
                        },
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                  },
                  {
                    type: 'paragraph',
                  },
                ],
              },
              null,
              2,
            ),
            descriptionTitle: "How we'll collaborate",
            dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            createdBy: '1',
            createdAt: new Date(dateFns.subDays(new Date(), 10)).toISOString(),
            updatedAt: '',
          },
          {
            id: '2',
            name: 'Marketing',
            color: {
              id: '10',
              name: 'pink',
              color: 'teal.400',
            },
            icon: {
              id: '3',
            },
            teammates: [
              {
                id: '3',
                teammateId: teammates.manato.id,
                projectId: '2',
                name: teammates.manato.name,
                image: teammates.manato.image,
                email: teammates.manato.email,
                isOwner: true,
                role: '',
                createdAt: new Date(
                  dateFns.subDays(new Date(), 5),
                ).toISOString(),
                updatedAt: '',
              },
              {
                id: '4',
                teammateId: teammates.dan.id,
                projectId: '2',
                name: teammates.dan.name,
                image: teammates.dan.image,
                email: teammates.dan.email,
                isOwner: false,
                role: '',
                createdAt: new Date(
                  dateFns.subDays(new Date(), 4),
                ).toISOString(),
                updatedAt: '',
              },
              {
                id: '5',
                teammateId: teammates.kent.id,
                projectId: '1',
                name: teammates.kent.name,
                image: teammates.kent.image,
                email: teammates.kent.email,
                isOwner: false,
                role: '',
                createdAt: new Date(
                  dateFns.subDays(new Date(), 3),
                ).toISOString(),
                updatedAt: '',
              },
            ],
            description: '',
            descriptionTitle: '',
            dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
            createdBy: '1',
            createdAt: new Date(dateFns.subDays(new Date(), 10)).toISOString(),
            updatedAt: '',
          },
        ],
      })
    }, 1000)
  })
}
