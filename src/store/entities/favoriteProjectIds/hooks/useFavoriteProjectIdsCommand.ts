import isEqual from 'lodash-es/isEqual'
import { useEffect } from 'react'
import { useRecoilCallback } from 'recoil'
import {
  useCreateFavoriteProjectMutation,
  useDeleteFavoriteProjectMutation,
  useFavoriteProjectIdsUpdatedSubscription,
} from 'src/graphql/hooks'
import { useMe } from 'src/store/entities/me'
import { favoriteProjectIdsState } from '../atom'
import { FavoriteProjectId } from '../type'

export const useFavoriteProjectIdsCommand = () => {
  const { me } = useMe()
  const [createFavoriteProjectMutation] = useCreateFavoriteProjectMutation()
  const [deleteFavoriteProjectMutation] = useDeleteFavoriteProjectMutation()
  const subscriptionResult = useFavoriteProjectIdsUpdatedSubscription({
    variables: {
      teammateId: me.id,
    },
    skip: !me.id,
  })

  const upsert = useRecoilCallback(
    ({ set }) =>
      (favoriteProjectId: FavoriteProjectId[]) => {
        set(favoriteProjectIdsState, favoriteProjectId)
      },
    [],
  )
  const updateBySubscription = useRecoilCallback(
    ({ snapshot }) =>
      async (response: FavoriteProjectId[]) => {
        const favoriteProjectIds = await snapshot.getPromise(
          favoriteProjectIdsState,
        )

        if (isEqual([...favoriteProjectIds].sort(), [...response].sort()))
          return

        upsert(response)
      },
    [upsert],
  )

  const deleteFavoriteProjectId = useRecoilCallback(
    ({ snapshot }) =>
      async (favoriteProjectId: string) => {
        const favoriteProjectIds = await snapshot.getPromise(
          favoriteProjectIdsState,
        )

        upsert(favoriteProjectIds.filter((id) => id !== favoriteProjectId))

        try {
          await deleteFavoriteProjectMutation({
            variables: {
              input: {
                teammateId: me.id,
                projectId: favoriteProjectId,
              },
            },
          })
        } catch (err) {
          upsert(favoriteProjectIds)
        }
      },
    [deleteFavoriteProjectMutation, me.id, upsert],
  )

  const addFavoriteProjectId = useRecoilCallback(
    ({ snapshot }) =>
      async (favoriteProjectId: string) => {
        const favoriteProjectIds = await snapshot.getPromise(
          favoriteProjectIdsState,
        )

        upsert([...favoriteProjectIds, favoriteProjectId])

        try {
          await createFavoriteProjectMutation({
            variables: {
              input: {
                teammateId: me.id,
                projectId: favoriteProjectId,
              },
            },
          })
        } catch (err) {
          upsert(favoriteProjectIds)
        }
      },
    [createFavoriteProjectMutation, me.id, upsert],
  )

  const setFavoriteProjectId = useRecoilCallback(
    ({ snapshot }) =>
      async (favoriteProjectId: string) => {
        const favoriteProjectIds = await snapshot.getPromise(
          favoriteProjectIdsState,
        )

        const isFavorite = favoriteProjectIds.some(
          (id) => id === favoriteProjectId,
        )
        if (isFavorite) {
          await deleteFavoriteProjectId(favoriteProjectId)
          return
        }

        await addFavoriteProjectId(favoriteProjectId)
      },
    [addFavoriteProjectId, deleteFavoriteProjectId],
  )

  useEffect(() => {
    if (subscriptionResult.loading) return
    if (!subscriptionResult.data?.favoriteProjectIdsUpdated) return

    updateBySubscription(subscriptionResult.data.favoriteProjectIdsUpdated)
  }, [
    updateBySubscription,
    subscriptionResult.data?.favoriteProjectIdsUpdated,
    subscriptionResult.loading,
  ])

  return {
    upsert,
    setFavoriteProjectId,
  }
}
