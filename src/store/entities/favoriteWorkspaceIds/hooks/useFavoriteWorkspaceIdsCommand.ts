import isEqual from 'lodash-es/isEqual'
import { useEffect } from 'react'
import { useRecoilCallback } from 'recoil'
import {
  useCreateFavoriteWorkspaceMutation,
  useDeleteFavoriteWorkspaceMutation,
  useFavoriteWorkspaceIdsUpdatedSubscription,
} from 'src/graphql/hooks'
import { useMe } from 'src/store/entities/me'
import { favoriteWorkspaceIdsState } from '../atom'
import { FavoriteWorkspaceId } from '../type'

export const useFavoriteWorkspaceIdsCommand = () => {
  const { me } = useMe()
  const [createFavoriteWorkspaceMutation] = useCreateFavoriteWorkspaceMutation()
  const [deleteFavoriteWorkspaceMutation] = useDeleteFavoriteWorkspaceMutation()
  const subscriptionResult = useFavoriteWorkspaceIdsUpdatedSubscription({
    variables: {
      teammateId: me.id,
    },
    skip: !me.id,
  })

  const upsert = useRecoilCallback(
    ({ set }) =>
      (favoriteWorkspaceId: FavoriteWorkspaceId[]) => {
        set(favoriteWorkspaceIdsState, favoriteWorkspaceId)
      },
    [],
  )
  const updateBySubscription = useRecoilCallback(
    ({ snapshot }) =>
      async (response: FavoriteWorkspaceId[]) => {
        const favoriteWorkspaceIds = await snapshot.getPromise(
          favoriteWorkspaceIdsState,
        )

        if (isEqual([...favoriteWorkspaceIds].sort(), [...response].sort()))
          return

        upsert(response)
      },
    [upsert],
  )

  const deleteFavoriteWorkspaceId = useRecoilCallback(
    ({ snapshot }) =>
      async (favoriteWorkspaceId: string) => {
        const favoriteWorkspaceIds = await snapshot.getPromise(
          favoriteWorkspaceIdsState,
        )

        upsert(favoriteWorkspaceIds.filter((id) => id !== favoriteWorkspaceId))

        try {
          await deleteFavoriteWorkspaceMutation({
            variables: {
              input: {
                teammateId: me.id,
                workspaceId: favoriteWorkspaceId,
              },
            },
          })
        } catch (err) {
          upsert(favoriteWorkspaceIds)
        }
      },
    [deleteFavoriteWorkspaceMutation, me.id, upsert],
  )

  const addFavoriteWorkspaceId = useRecoilCallback(
    ({ snapshot }) =>
      async (favoriteWorkspaceId: string) => {
        const favoriteWorkspaceIds = await snapshot.getPromise(
          favoriteWorkspaceIdsState,
        )

        upsert([...favoriteWorkspaceIds, favoriteWorkspaceId])

        try {
          await createFavoriteWorkspaceMutation({
            variables: {
              input: {
                teammateId: me.id,
                workspaceId: favoriteWorkspaceId,
              },
            },
          })
        } catch (err) {
          upsert(favoriteWorkspaceIds)
        }
      },
    [createFavoriteWorkspaceMutation, me.id, upsert],
  )

  const setFavoriteWorkspaceId = useRecoilCallback(
    ({ snapshot }) =>
      async (favoriteWorkspaceId: string) => {
        const favoriteWorkspaceIds = await snapshot.getPromise(
          favoriteWorkspaceIdsState,
        )

        const isFavorite = favoriteWorkspaceIds.some(
          (id) => id === favoriteWorkspaceId,
        )
        if (isFavorite) {
          await deleteFavoriteWorkspaceId(favoriteWorkspaceId)
          return
        }

        await addFavoriteWorkspaceId(favoriteWorkspaceId)
      },
    [addFavoriteWorkspaceId, deleteFavoriteWorkspaceId],
  )

  useEffect(() => {
    if (subscriptionResult.loading) return
    if (!subscriptionResult.data?.favoriteWorkspaceIdsUpdated) return

    updateBySubscription(subscriptionResult.data.favoriteWorkspaceIdsUpdated)
  }, [
    updateBySubscription,
    subscriptionResult.data?.favoriteWorkspaceIdsUpdated,
    subscriptionResult.loading,
  ])

  return {
    upsert,
    setFavoriteWorkspaceId,
  }
}
