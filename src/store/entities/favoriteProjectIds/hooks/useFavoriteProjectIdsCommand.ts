import { useRecoilCallback } from 'recoil'
import {
  useCreateFavoriteProjectMutation,
  useDeleteFavoriteProjectMutation,
} from 'src/graphql/hooks'
import { useMe } from 'src/store/entities/me'
import { favoriteProjectIdsState } from '../atom'
import {
  useFavoriteProjectIdsUpdatedSubscription,
  FAVORITE_PROJECT_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID,
} from './useFavoriteProjectIdsUpdatedSubscription'
import { useUpsert } from './useUpsert'

export const useFavoriteProjectIdsCommand = () => {
  const { me } = useMe()
  const [createFavoriteProjectMutation] = useCreateFavoriteProjectMutation()
  const [deleteFavoriteProjectMutation] = useDeleteFavoriteProjectMutation()
  const { upsert } = useUpsert()

  useFavoriteProjectIdsUpdatedSubscription()

  const deleteFavoriteProjectId = useRecoilCallback(
    ({ snapshot }) =>
      async (favoriteProjectId: string) => {
        const prev = await snapshot.getPromise(favoriteProjectIdsState)

        upsert(prev.filter((id) => id !== favoriteProjectId))

        const res = await deleteFavoriteProjectMutation({
          variables: {
            input: {
              teammateId: me.id,
              projectId: favoriteProjectId,
              requestId: FAVORITE_PROJECT_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID,
            },
          },
        })
        if (res.errors) {
          upsert(prev)
        }
      },
    [deleteFavoriteProjectMutation, me.id, upsert],
  )

  const addFavoriteProjectId = useRecoilCallback(
    ({ snapshot }) =>
      async (favoriteProjectId: string) => {
        const prev = await snapshot.getPromise(favoriteProjectIdsState)

        upsert([...prev, favoriteProjectId])

        const res = await createFavoriteProjectMutation({
          variables: {
            input: {
              teammateId: me.id,
              projectId: favoriteProjectId,
              requestId: FAVORITE_PROJECT_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID,
            },
          },
        })
        if (res.errors) {
          upsert(prev)
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

  return {
    setFavoriteProjectId,
  }
}
